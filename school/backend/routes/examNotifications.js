const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const { protect } = require('../middleware/auth');
const { sendExamNotificationEmail } = require('../config/email');
const User = require('../models/User');

// Static exam data (matches your frontend ExamNotifications.jsx)
const EXAM_DATA = [
  {
    id: 1,
    name: 'UPSC Civil Services',
    category: 'civil-service',
    notificationDate: 'Jan 15, 2025',
    admitCardDate: 'May 20, 2025',
    examDate: 'Jun 15, 2025',
    resultDate: 'Aug 30, 2025',
    status: 'upcoming',
    location: 'All India',
    link: 'https://www.upsc.gov.in',
  },
  {
    id: 2,
    name: 'SSC CGL 2025',
    category: 'ssc',
    notificationDate: 'Mar 1, 2025',
    admitCardDate: 'Nov 15, 2025',
    examDate: 'Dec 1, 2025',
    resultDate: 'Feb 28, 2026',
    status: 'ongoing',
    location: 'All India',
    link: 'https://www.ssc.nic.in',
  },
  {
    id: 3,
    name: 'NEET UG 2026',
    category: 'medical',
    notificationDate: 'Jan 10, 2025',
    admitCardDate: 'Apr 10, 2025',
    examDate: 'May 5, 2025',
    resultDate: 'Jun 15, 2025',
    status: 'upcoming',
    location: 'All India',
    link: 'https://www.neet.nta.ac.in',
  },
  {
    id: 4,
    name: 'JEE Main 2026',
    category: 'engineering',
    notificationDate: 'Nov 20, 2024',
    admitCardDate: 'Mar 15, 2025',
    examDate: 'Apr 1, 2025',
    resultDate: 'May 30, 2025',
    status: 'upcoming',
    location: 'All India',
    link: 'https://www.jeemain.nta.ac.in',
  },
  {
    id: 5,
    name: 'GATE 2026',
    category: 'engineering',
    notificationDate: 'Sep 1, 2024',
    admitCardDate: 'Jan 2, 2025',
    examDate: 'Feb 1, 2025',
    resultDate: 'Mar 21, 2025',
    status: 'result-out',
    location: 'All India',
    link: 'https://gate.iitm.ac.in',
  },
  {
    id: 6,
    name: 'CAT 2025',
    category: 'mba',
    notificationDate: 'Jul 15, 2025',
    admitCardDate: 'Oct 15, 2025',
    examDate: 'Nov 30, 2025',
    resultDate: 'Jan 15, 2026',
    status: 'ongoing',
    location: 'All India',
    link: 'https://www.iimcat.ac.in',
  },
  {
    id: 7,
    name: 'Bank PO (IBPS PO) 2025',
    category: 'banking',
    notificationDate: 'Feb 1, 2025',
    admitCardDate: 'Apr 1, 2025',
    examDate: 'May 4, 2025',
    resultDate: 'Jun 30, 2025',
    status: 'upcoming',
    location: 'All India',
    link: 'https://www.ibps.in',
  },
  {
    id: 8,
    name: 'RRB NTPC 2025',
    category: 'railway',
    notificationDate: 'Jan 20, 2025',
    admitCardDate: 'May 1, 2025',
    examDate: 'Jun 15, 2025',
    resultDate: 'Aug 30, 2025',
    status: 'upcoming',
    location: 'All India',
    link: 'https://www.rrbcdg.gov.in',
  },
];

// ── GET /api/exams — list all exam notifications ──────────────────────────────
router.get('/', async (req, res) => {
  const { category, status } = req.query;
  let exams = [...EXAM_DATA];

  if (category && category !== 'all') {
    exams = exams.filter((e) => e.category === category);
  }
  if (status && status !== 'all') {
    exams = exams.filter((e) => e.status === status);
  }

  res.json({ success: true, count: exams.length, exams });
});

// ── GET /api/exams/:id — single exam ─────────────────────────────────────────
router.get('/:id', async (req, res) => {
  const exam = EXAM_DATA.find((e) => e.id === parseInt(req.params.id));
  if (!exam) return res.status(404).json({ success: false, message: 'Exam not found.' });
  res.json({ success: true, exam });
});

// ── POST /api/exams/:id/notify-me — send exam notification email to user ──────
router.post(
  '/:id/notify-me',
  protect,
  async (req, res, next) => {
    try {
      const exam = EXAM_DATA.find((e) => e.id === parseInt(req.params.id));
      if (!exam) {
        return res.status(404).json({ success: false, message: 'Exam not found.' });
      }

      // Check user's notification preference
      if (req.user.notifications && req.user.notifications.examAlerts === false) {
        return res.status(400).json({
          success: false,
          message: 'You have disabled exam notifications. Update your profile settings to enable them.',
        });
      }

      await sendExamNotificationEmail(req.user, exam);

      res.json({
        success: true,
        message: `Exam notification for "${exam.name}" sent to ${req.user.email}`,
      });
    } catch (error) {
      next(error);
    }
  }
);

// ── POST /api/exams/notify-all — send all upcoming exam notifications ──────────
router.post('/notify-all', protect, async (req, res, next) => {
  try {
    const upcomingExams = EXAM_DATA.filter((e) => e.status === 'upcoming' || e.status === 'ongoing');

    const results = [];
    for (const exam of upcomingExams) {
      try {
        await sendExamNotificationEmail(req.user, exam);
        results.push({ exam: exam.name, sent: true });
      } catch (err) {
        results.push({ exam: exam.name, sent: false, error: err.message });
      }
    }

    res.json({
      success: true,
      message: `Notifications sent for ${results.filter((r) => r.sent).length} exams`,
      results,
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;