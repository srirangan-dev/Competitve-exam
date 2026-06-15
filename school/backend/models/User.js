const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
      trim: true,
      maxlength: [50, 'Name cannot exceed 50 characters'],
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      lowercase: true,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, 'Please provide a valid email'],
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
      minlength: [6, 'Password must be at least 6 characters'],
      select: false, // don't return password by default
    },
    targetExam: {
      type: String,
      enum: ['JEE_MAIN', 'JEE_ADVANCED', 'NEET', 'BITSAT', 'UPSC', 'SSC', 'CAT', 'GATE', 'OTHER'],
      default: 'JEE_MAIN',
    },
    avatar: {
      type: String,
      default: function () {
        return `https://api.dicebear.com/7.x/avataaars/svg?seed=${this.name}`;
      },
    },
    role: {
      type: String,
      enum: ['student', 'admin'],
      default: 'student',
    },
    // Password reset fields
    resetOTP: { type: String, select: false },
    resetOTPExpires: { type: Date, select: false },

    // Email notification preferences
    notifications: {
      examAlerts: { type: Boolean, default: true },
      weeklyReport: { type: Boolean, default: true },
    },
  },
  { timestamps: true }
);

// Hash password before saving
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  const salt = await bcrypt.genSalt(12);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Instance method — compare password
userSchema.methods.comparePassword = async function (candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

// Instance method — safe user object (no sensitive fields)
userSchema.methods.toSafeObject = function () {
  return {
    id: this._id,
    name: this.name,
    email: this.email,
    targetExam: this.targetExam,
    avatar: this.avatar,
    role: this.role,
    notifications: this.notifications,
    createdAt: this.createdAt,
  };
};

module.exports = mongoose.model('User', userSchema);