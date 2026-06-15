const mongoose = require('mongoose');

const chatMessageSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true,
    },
    subject: {
      type: String,
      enum: ['Physics', 'Chemistry', 'Mathematics', 'Biology', 'General', 'Other'],
      default: 'General',
    },
    exam: {
      type: String,
      enum: ['JEE Advanced 2025', 'NEET 2025', 'UPSC CSE 2025', 'SSC CGL 2025', 'CAT 2025', 'GATE CS 2025'],
      default: 'JEE Advanced 2025',
    },
    messages: [
      {
        role: {
          type: String,
          enum: ['user', 'assistant'],
          required: true,
        },
        content: {
          type: String,
          required: true,
        },
        timestamp: {
          type: Date,
          default: Date.now,
        },
      },
    ],
    title: {
      type: String,
      default: null, // Auto-generated from first user message
    },
    messageCount: {
      type: Number,
      default: 0,
    },
    usage: {
      // Groq API usage stats
      promptTokens: { type: Number, default: 0 },
      completionTokens: { type: Number, default: 0 },
      totalTokens: { type: Number, default: 0 },
    },
    isArchived: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

// Auto-generate title from first message
chatMessageSchema.pre('save', function (next) {
  if (!this.title && this.messages.length > 0) {
    const firstMessage = this.messages[0].content;
    this.title = firstMessage.substring(0, 50) + (firstMessage.length > 50 ? '...' : '');
  }
  this.messageCount = this.messages.length;
  next();
});

// Index for faster queries
chatMessageSchema.index({ user: 1, createdAt: -1 });
chatMessageSchema.index({ user: 1, isArchived: 1 });

module.exports = mongoose.model('ChatMessage', chatMessageSchema);