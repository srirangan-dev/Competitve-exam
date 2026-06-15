const express = require('express');
const router = express.Router();
const rateLimit = require('express-rate-limit');
const { body, validationResult } = require('express-validator');
const Groq = require('groq-sdk');

const { protect } = require('../middleware/auth');
const ChatSession = require('../models/ChatMessage');

// Init Groq client
const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

// Active model — reads from .env, falls back to latest working model
const GROQ_MODEL = process.env.GROQ_MODEL || 'llama-3.3-70b-versatile';

// Rate limiter — 30 messages per minute per user
const aiLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 30,
  keyGenerator: (req) => req.user?._id?.toString() || req.ip,
  message: { success: false, message: 'Too many requests. Please slow down.' },
});

// ── System prompt for the AI tutor ───────────────────────────────────────────
const SYSTEM_PROMPT = `You are StudyAI, an expert AI tutor for Indian competitive exam students on ApexPrep. 
You specialize in JEE (Main & Advanced), NEET, UPSC CSE, SSC CGL, CAT, GATE, and Banking (IBPS PO) exams.

Your expertise covers:
- Physics: Mechanics, Thermodynamics, Electromagnetism, Optics, Modern Physics
- Chemistry: Physical, Organic, Inorganic Chemistry
- Mathematics: Algebra, Calculus, Coordinate Geometry, Trigonometry, Statistics
- Biology: Botany, Zoology, Genetics, Ecology (for NEET)
- General Studies: History, Polity, Geography, Economy, Science & Technology (for UPSC/SSC)
- Quantitative Aptitude, Reasoning, English (for SSC/Banking/CAT)

Guidelines:
1. Give clear, step-by-step solutions to problems.
2. Use simple language appropriate for students preparing for competitive exams.
3. When solving numerical problems, show all steps clearly.
4. Mention relevant formulas and concepts.
5. Point out common mistakes students make on this topic.
6. When relevant, mention if the topic is high-weightage for specific exams.
7. Be encouraging and supportive.
8. Use LaTeX notation only if absolutely necessary for clarity (e.g., $E = mc^2$).
9. Keep responses concise but complete.
10. If a question is unclear, ask for clarification.`;

// ── POST /api/ai/chat — send message, get AI reply ───────────────────────────
router.post(
  '/chat',
  protect,
  aiLimiter,
  [
    body('message').trim().notEmpty().withMessage('Message cannot be empty').isLength({ max: 2000 }).withMessage('Message too long'),
    body('sessionId').optional().isMongoId().withMessage('Invalid session ID'),
    body('subject').optional().isIn(['Physics', 'Chemistry', 'Mathematics', 'Biology', 'General', 'Other']),
  ],
  async (req, res, next) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) return res.status(400).json({ success: false, errors: errors.array() });

      const { message, sessionId, subject = 'General' } = req.body;
      const userId = req.user._id;

      // Load or create chat session
      let session;
      if (sessionId) {
        session = await ChatSession.findOne({ _id: sessionId, user: userId });
        if (!session) {
          return res.status(404).json({ success: false, message: 'Chat session not found.' });
        }
      } else {
        session = new ChatSession({ user: userId, subject, messages: [] });
      }

      // Add user message to session
      session.messages.push({ role: 'user', content: message });

      // Build messages for Groq (last 20 to stay within context limit)
      const recentMessages = session.messages.slice(-20).map((m) => ({
        role: m.role,
        content: m.content,
      }));

      // Call Groq API
      const completion = await groq.chat.completions.create({
        model: GROQ_MODEL,
        messages: [
          { role: 'system', content: SYSTEM_PROMPT },
          ...recentMessages,
        ],
        temperature: 0.7,
        max_tokens: 1024,
        stream: false,
      });

      const aiReply = completion.choices[0]?.message?.content || "I'm sorry, I couldn't process that. Please try again.";

      // Save AI reply to session
      session.messages.push({ role: 'assistant', content: aiReply });

      // Update subject if not set
      if (session.subject === 'General' && subject !== 'General') {
        session.subject = subject;
      }

      await session.save();

      res.json({
        success: true,
        reply: aiReply,
        sessionId: session._id,
        usage: completion.usage,
      });
    } catch (error) {
      if (error?.error?.type === 'invalid_request_error') {
        return res.status(400).json({ success: false, message: `AI model error: ${error.error.message}` });
      }
      if (error?.status === 429) {
        return res.status(429).json({ success: false, message: 'AI service rate limit reached. Please wait a moment.' });
      }
      next(error);
    }
  }
);

// ── POST /api/ai/chat/stream — streaming response ────────────────────────────
router.post(
  '/chat/stream',
  protect,
  aiLimiter,
  [body('message').trim().notEmpty().isLength({ max: 2000 })],
  async (req, res, next) => {
    try {
      const { message, sessionId, subject = 'General' } = req.body;
      const userId = req.user._id;

      // Set SSE headers
      res.setHeader('Content-Type', 'text/event-stream');
      res.setHeader('Cache-Control', 'no-cache');
      res.setHeader('Connection', 'keep-alive');
      res.setHeader('X-Accel-Buffering', 'no');

      let session;
      if (sessionId) {
        session = await ChatSession.findOne({ _id: sessionId, user: userId });
      } else {
        session = new ChatSession({ user: userId, subject, messages: [] });
      }

      if (!session) {
        res.write(`data: ${JSON.stringify({ error: 'Session not found' })}\n\n`);
        return res.end();
      }

      session.messages.push({ role: 'user', content: message });
      const recentMessages = session.messages.slice(-20).map((m) => ({ role: m.role, content: m.content }));

      // Groq streaming
      const stream = await groq.chat.completions.create({
        model: GROQ_MODEL,
        messages: [{ role: 'system', content: SYSTEM_PROMPT }, ...recentMessages],
        temperature: 0.7,
        max_tokens: 1024,
        stream: true,
      });

      let fullReply = '';

      for await (const chunk of stream) {
        const delta = chunk.choices[0]?.delta?.content || '';
        if (delta) {
          fullReply += delta;
          res.write(`data: ${JSON.stringify({ delta, done: false })}\n\n`);
        }
      }

      // Save full reply to DB
      session.messages.push({ role: 'assistant', content: fullReply });
      await session.save();

      res.write(`data: ${JSON.stringify({ done: true, sessionId: session._id })}\n\n`);
      res.end();
    } catch (error) {
      res.write(`data: ${JSON.stringify({ error: error.message || 'AI error' })}\n\n`);
      res.end();
    }
  }
);

// ── GET /api/ai/sessions — list user's chat sessions ─────────────────────────
router.get('/sessions', protect, async (req, res, next) => {
  try {
    const sessions = await ChatSession.find({ user: req.user._id })
      .select('title subject createdAt updatedAt')
      .sort({ updatedAt: -1 })
      .limit(20);

    res.json({ success: true, sessions });
  } catch (error) {
    next(error);
  }
});

// ── GET /api/ai/sessions/:id — get a specific session with messages ───────────
router.get('/sessions/:id', protect, async (req, res, next) => {
  try {
    const session = await ChatSession.findOne({ _id: req.params.id, user: req.user._id });
    if (!session) return res.status(404).json({ success: false, message: 'Session not found.' });

    res.json({ success: true, session });
  } catch (error) {
    next(error);
  }
});

// ── DELETE /api/ai/sessions/:id — delete a session ───────────────────────────
router.delete('/sessions/:id', protect, async (req, res, next) => {
  try {
    await ChatSession.findOneAndDelete({ _id: req.params.id, user: req.user._id });
    res.json({ success: true, message: 'Session deleted.' });
  } catch (error) {
    next(error);
  }
});

// ── POST /api/ai/quick — one-shot question without saving history ─────────────
router.post(
  '/quick',
  protect,
  aiLimiter,
  [body('question').trim().notEmpty().isLength({ max: 500 })],
  async (req, res, next) => {
    try {
      const { question } = req.body;

      const completion = await groq.chat.completions.create({
        model: GROQ_MODEL,
        messages: [
          { role: 'system', content: SYSTEM_PROMPT },
          { role: 'user', content: question },
        ],
        temperature: 0.5,
        max_tokens: 512,
      });

      const answer = completion.choices[0]?.message?.content || 'No response generated.';
      res.json({ success: true, answer });
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;