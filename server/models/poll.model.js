const mongoose = require('mongoose');

const PollSchema = mongoose.Schema(
  {
    title: { type: String, required: true },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    candidates: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Candidate' }],
    description: { type: String, required: true },
    status: {
      type: String,
      enum: ['ONGOING', 'CLOSED', 'CANCELLED', 'PENDING'],
      default: 'ONGOING',
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Poll', PollSchema);
