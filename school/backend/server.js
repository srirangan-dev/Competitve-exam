require('dotenv').config();

const dns = require('dns');
dns.setServers(['8.8.8.8', '8.8.4.4']);

const express = require('express');
const cors = require('cors');
const rateLimit = require('express-rate-limit');

const connectDB = require('./config/db');
const { verifyEmailConnection } = require('./config/email');
const errorHandler = require('./middleware/errorHandler');

// ── Route imports ─────────────────────────────────────────────────────────────
const authRoutes = require('./routes/auth');
const aiRoutes = require('./routes/ai');
const examRoutes = require('./routes/examNotifications');

// ── Init app ──────────────────────────────────────────────────────────────────
const app = express();

// ── Connect to MongoDB ────────────────────────────────────────────────────────
connectDB();

// ── Verify email on startup ───────────────────────────────────────────────────
verifyEmailConnection();

// ── Global middlewares ────────────────────────────────────────────────────────

// CORS — allow your React frontend
app.use(
  cors({
    origin: process.env.FRONTEND_URL || 'http://localhost:3000',
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  })
);

// Parse JSON body
app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true }));

// Global rate limit — 200 requests per 15 min per IP
app.use(
  rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 200,
    standardHeaders: true,
    legacyHeaders: false,
  })
);

// ── Routes ────────────────────────────────────────────────────────────────────
app.use('/api/auth', authRoutes);
app.use('/api/ai', aiRoutes);
app.use('/api/exams', examRoutes);

// ── Health check ──────────────────────────────────────────────────────────────
app.get('/api/health', (req, res) => {
  res.json({
    success: true,
    status: 'running',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development',
  });
});

// ── 404 handler ───────────────────────────────────────────────────────────────
app.use((req, res) => {
  res.status(404).json({ success: false, message: `Route ${req.method} ${req.path} not found.` });
});

// ── Global error handler ──────────────────────────────────────────────────────
app.use(errorHandler);

// ── Start server ──────────────────────────────────────────────────────────────
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`\n🚀 ApexPrep Backend running on port ${PORT}`);
  console.log(`📌 Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`🌐 CORS allowed for: ${process.env.FRONTEND_URL || 'http://localhost:3000'}`);
  console.log(`\nAPI endpoints:`);
  console.log(`  POST /api/auth/signup`);
  console.log(`  POST /api/auth/login`);
  console.log(`  GET  /api/auth/me`);
  console.log(`  POST /api/auth/forgot-password`);
  console.log(`  POST /api/auth/reset-password`);
  console.log(`  POST /api/ai/chat`);
  console.log(`  POST /api/ai/chat/stream`);
  console.log(`  GET  /api/ai/sessions`);
  console.log(`  GET  /api/exams`);
  console.log(`  POST /api/exams/:id/notify-me\n`);
});

module.exports = app;