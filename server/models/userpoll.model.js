const mongoose = require('mongoose');

const UserPollSchema = mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    poll: { type: mongoose.Schema.Types.ObjectId, ref: 'Poll' },
    status: {
      type: String,
      enum: ['HAS_VOTED', 'HAS_NOT_VOTED'],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('UserPoll', UserPollSchema);
