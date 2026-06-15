const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const rateLimit = require('express-rate-limit');
const crypto = require('crypto');

const User = require('../models/User');
const { protect, signToken } = require('../middleware/auth');
const { sendWelcomeEmail, sendPasswordResetEmail } = require('../config/email');

// ── Rate limiters ────────────────────────────────────────────────────────────
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10,
  message: { success: false, message: 'Too many attempts. Please try again after 15 minutes.' },
  standardHeaders: true,
  legacyHeaders: false,
});

// ── Validation rules ─────────────────────────────────────────────────────────
const signupValidation = [
  body('name').trim().notEmpty().withMessage('Name is required').isLength({ max: 50 }).withMessage('Name too long'),
  body('email').isEmail().withMessage('Please provide a valid email').normalizeEmail(),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
  body('exam').optional().isIn(['JEE_MAIN', 'JEE_ADVANCED', 'NEET', 'BITSAT', 'UPSC', 'SSC', 'CAT', 'GATE', 'OTHER']),
];

const loginValidation = [
  body('email').isEmail().withMessage('Please provide a valid email').normalizeEmail(),
  body('password').notEmpty().withMessage('Password is required'),
];

// ── Helper: send token response ───────────────────────────────────────────────
const sendTokenResponse = (user, statusCode, res) => {
  const token = signToken(user._id);
  res.status(statusCode).json({
    success: true,
    token,
    user: user.toSafeObject(),
  });
};

// ── POST /api/auth/signup ────────────────────────────────────────────────────
router.post('/signup', authLimiter, signupValidation, async (req, res, next) => {
  try {
    // Validate input
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }

    const { name, email, password, exam } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ success: false, message: 'An account with this email already exists.' });
    }

    // Create user
    const user = await User.create({
      name,
      email,
      password,
      targetExam: exam || 'JEE_MAIN',
    });

    // Send welcome email (non-blocking — don't fail signup if email fails)
    sendWelcomeEmail(user).catch((err) => console.warn('Welcome email failed:', err.message));

    sendTokenResponse(user, 201, res);
  } catch (error) {
    next(error);
  }
});

// ── POST /api/auth/login ─────────────────────────────────────────────────────
router.post('/login', authLimiter, loginValidation, async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }

    const { email, password } = req.body;

    // Find user and include password (excluded by default)
    const user = await User.findOne({ email }).select('+password');
    if (!user) {
      return res.status(401).json({ success: false, message: 'Invalid email or password.' });
    }

    // Compare password
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ success: false, message: 'Invalid email or password.' });
    }

    sendTokenResponse(user, 200, res);
  } catch (error) {
    next(error);
  }
});

// ── GET /api/auth/me — get current user ─────────────────────────────────────
router.get('/me', protect, async (req, res) => {
  res.json({ success: true, user: req.user.toSafeObject() });
});

// ── PUT /api/auth/profile — update profile ───────────────────────────────────
router.put(
  '/profile',
  protect,
  [
    body('name').optional().trim().notEmpty().withMessage('Name cannot be empty'),
    body('targetExam').optional().isIn(['JEE_MAIN', 'JEE_ADVANCED', 'NEET', 'BITSAT', 'UPSC', 'SSC', 'CAT', 'GATE', 'OTHER']),
  ],
  async (req, res, next) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) return res.status(400).json({ success: false, errors: errors.array() });

      const { name, targetExam, notifications } = req.body;
      const updates = {};
      if (name) updates.name = name;
      if (targetExam) updates.targetExam = targetExam;
      if (notifications) updates.notifications = { ...req.user.notifications, ...notifications };

      const user = await User.findByIdAndUpdate(req.user._id, updates, { new: true, runValidators: true });
      res.json({ success: true, user: user.toSafeObject() });
    } catch (error) {
      next(error);
    }
  }
);

// ── POST /api/auth/forgot-password ──────────────────────────────────────────
router.post(
  '/forgot-password',
  authLimiter,
  [body('email').isEmail().withMessage('Please provide a valid email').normalizeEmail()],
  async (req, res, next) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) return res.status(400).json({ success: false, errors: errors.array() });

      const user = await User.findOne({ email: req.body.email });

      // Always return success to prevent email enumeration
      if (!user) {
        return res.json({ success: true, message: 'If that email is registered, you will receive an OTP.' });
      }

      // Generate 6-digit OTP
      const otp = Math.floor(100000 + Math.random() * 900000).toString();
      const hashedOTP = crypto.createHash('sha256').update(otp).digest('hex');

      user.resetOTP = hashedOTP;
      user.resetOTPExpires = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes
      await user.save({ validateBeforeSave: false });

      // Send OTP email
      await sendPasswordResetEmail(user, otp);

      res.json({ success: true, message: 'OTP sent to your email address.' });
    } catch (error) {
      next(error);
    }
  }
);

// ── POST /api/auth/reset-password ───────────────────────────────────────────
router.post(
  '/reset-password',
  [
    body('email').isEmail().normalizeEmail(),
    body('otp').isLength({ min: 6, max: 6 }).withMessage('OTP must be 6 digits'),
    body('newPassword').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
  ],
  async (req, res, next) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) return res.status(400).json({ success: false, errors: errors.array() });

      const { email, otp, newPassword } = req.body;
      const hashedOTP = crypto.createHash('sha256').update(otp).digest('hex');

      const user = await User.findOne({
        email,
        resetOTP: hashedOTP,
        resetOTPExpires: { $gt: Date.now() },
      }).select('+resetOTP +resetOTPExpires');

      if (!user) {
        return res.status(400).json({ success: false, message: 'Invalid or expired OTP.' });
      }

      // Reset password
      user.password = newPassword;
      user.resetOTP = undefined;
      user.resetOTPExpires = undefined;
      await user.save();

      sendTokenResponse(user, 200, res);
    } catch (error) {
      next(error);
    }
  }
);

// ── POST /api/auth/change-password ──────────────────────────────────────────
router.post(
  '/change-password',
  protect,
  [
    body('currentPassword').notEmpty().withMessage('Current password is required'),
    body('newPassword').isLength({ min: 6 }).withMessage('New password must be at least 6 characters'),
  ],
  async (req, res, next) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) return res.status(400).json({ success: false, errors: errors.array() });

      const user = await User.findById(req.user._id).select('+password');
      const isMatch = await user.comparePassword(req.body.currentPassword);
      if (!isMatch) {
        return res.status(400).json({ success: false, message: 'Current password is incorrect.' });
      }

      user.password = req.body.newPassword;
      await user.save();

      res.json({ success: true, message: 'Password changed successfully.' });
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;