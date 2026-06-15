const nodemailer = require('nodemailer');

// Create reusable transporter (SMTP)
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: parseInt(process.env.SMTP_PORT) || 587,
  secure: process.env.SMTP_SECURE === 'true', // true for port 465
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
  tls: {
    rejectUnauthorized: false, // allow self-signed certs in dev
  },
});

// Verify connection on startup
const verifyEmailConnection = async () => {
  try {
    await transporter.verify();
    console.log('SMTP email server ready');
  } catch (error) {
    console.warn('SMTP not configured:', error.message);
  }
};

// ── Generic send helper ──────────────────────────────────────────────────────
const sendEmail = async ({ to, subject, html, text }) => {
  const mailOptions = {
    from: `"${process.env.EMAIL_FROM_NAME || 'ApexPrep'}" <${process.env.EMAIL_FROM_ADDRESS}>`,
    to,
    subject,
    html,
    text: text || html.replace(/<[^>]*>/g, ''), // strip HTML for plain-text fallback
  };

  const info = await transporter.sendMail(mailOptions);
  console.log(`Email sent to ${to}: ${info.messageId}`);
  return info;
};

// Shared styles kept minimal and consistent across all templates
const baseStyles = `
  body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Arial, sans-serif; margin: 0; background: #ffffff; color: #1f2937; }
  .container { max-width: 600px; margin: 0 auto; padding: 32px 24px; }
  .header { border-bottom: 2px solid #185FA5; padding-bottom: 16px; margin-bottom: 24px; }
  .header h1 { font-size: 18px; font-weight: 700; color: #185FA5; margin: 0; letter-spacing: 0.2px; }
  h2 { font-size: 17px; color: #1f2937; margin: 0 0 4px; }
  p { font-size: 14px; line-height: 1.6; color: #374151; margin: 0 0 12px; }
  .btn { display: inline-block; background: #185FA5; color: #ffffff; text-decoration: none; padding: 10px 20px; border-radius: 4px; font-size: 14px; font-weight: 600; margin: 12px 0; }
  .footer { margin-top: 32px; padding-top: 16px; border-top: 1px solid #e5e7eb; font-size: 12px; color: #9ca3af; }
  .footer a { color: #185FA5; text-decoration: none; }
`;

// ── Welcome email on signup ──────────────────────────────────────────────────
const sendWelcomeEmail = async (user) => {
  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <style>
        ${baseStyles}
        .features { margin: 16px 0 20px; padding: 0; list-style: none; }
        .features li { font-size: 14px; line-height: 1.8; color: #374151; padding-left: 14px; position: relative; }
        .features li:before { content: "-"; position: absolute; left: 0; color: #185FA5; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>ApexPrep</h1>
        </div>
        <h2>Welcome, ${user.name}</h2>
        <p>Your ApexPrep account has been created successfully. You're all set to begin preparing for <strong>${user.targetExam || 'your target exam'}</strong>.</p>
        <a href="${process.env.FRONTEND_URL}/dashboard" class="btn">Go to Dashboard</a>
        <p>Your account includes access to:</p>
        <ul class="features">
          <li>Full-length and chapter-wise mock tests</li>
          <li>AI-powered doubt solving</li>
          <li>A personalized study planner</li>
          <li>A current affairs digest mapped to your exam</li>
        </ul>
        <p>You can sign in any time using: <strong>${user.email}</strong></p>
        <div class="footer">
          <p>ApexPrep &middot; <a href="${process.env.FRONTEND_URL}">${String(process.env.FRONTEND_URL || '').replace(/^https?:\/\//, '')}</a></p>
          <p>You are receiving this email because you created an account at ApexPrep.</p>
        </div>
      </div>
    </body>
    </html>
  `;

  return sendEmail({ to: user.email, subject: 'Welcome to ApexPrep', html });
};

// ── Exam notification / reminder email ───────────────────────────────────────
const sendExamNotificationEmail = async (user, exam) => {
  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <style>
        ${baseStyles}
        .location { font-size: 13px; color: #6b7280; margin: 0 0 16px; }
        table.timeline { width: 100%; border-collapse: collapse; margin: 16px 0 24px; }
        table.timeline td { padding: 8px 0; font-size: 14px; border-bottom: 1px solid #e5e7eb; }
        table.timeline td.label { color: #6b7280; width: 50%; }
        table.timeline td.date { color: #1f2937; font-weight: 600; text-align: right; }
        .tip { font-size: 13px; color: #6b7280; margin-top: 8px; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>ApexPrep</h1>
        </div>
        <h2>${exam.name}</h2>
        <p class="location">${exam.location || 'All India'}</p>
        <p>Hi ${user.name}, here are the key dates for ${exam.name}.</p>
        <table class="timeline">
          <tr><td class="label">Notification released</td><td class="date">${exam.notificationDate}</td></tr>
          <tr><td class="label">Admit card</td><td class="date">${exam.admitCardDate}</td></tr>
          <tr><td class="label">Exam date</td><td class="date">${exam.examDate}</td></tr>
          <tr><td class="label">Result expected</td><td class="date">${exam.resultDate}</td></tr>
        </table>
        <a href="${exam.link || '#'}" class="btn">Visit Official Website</a>
        <p class="tip">Tip: download your admit card as soon as it is available and keep multiple copies.</p>
        <div class="footer">
          <p>ApexPrep &middot; <a href="${process.env.FRONTEND_URL}/exam-notifications">View all exam notifications</a></p>
        </div>
      </div>
    </body>
    </html>
  `;

  return sendEmail({
    to: user.email,
    subject: `${exam.name} - Key Dates and Notification`,
    html,
  });
};

// ── Password reset OTP email ─────────────────────────────────────────────────
const sendPasswordResetEmail = async (user, otp) => {
  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <style>
        ${baseStyles}
        .otp-box { border: 1px solid #e5e7eb; border-radius: 6px; padding: 16px; margin: 20px 0; text-align: center; }
        .otp { font-size: 30px; font-weight: 700; color: #185FA5; letter-spacing: 8px; font-family: 'Courier New', monospace; }
        .expire { font-size: 12px; color: #9ca3af; margin-top: 6px; }
        .notice { font-size: 13px; color: #92400E; background: #FEF3C7; border-radius: 4px; padding: 10px 12px; margin-top: 16px; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>ApexPrep</h1>
        </div>
        <h2>Password Reset Code</h2>
        <p>Hi ${user.name}, use the code below to reset your password. Do not share this code with anyone.</p>
        <div class="otp-box">
          <div class="otp">${otp}</div>
          <div class="expire">This code expires in 10 minutes</div>
        </div>
        <p class="notice">If you did not request a password reset, you can safely ignore this email. Your account remains secure.</p>
        <div class="footer">
          <p>ApexPrep &middot; Automated security notification</p>
        </div>
      </div>
    </body>
    </html>
  `;

  return sendEmail({
    to: user.email,
    subject: 'ApexPrep - Password Reset Code',
    html,
  });
};

module.exports = {
  transporter,
  verifyEmailConnection,
  sendEmail,
  sendWelcomeEmail,
  sendExamNotificationEmail,
  sendPasswordResetEmail,
};