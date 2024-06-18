const mongoose = require('mongoose');

const CandidateSchema = mongoose.Schema(
  {
    poll: { type: mongoose.Schema.Types.ObjectId, ref: 'Poll' },
    names: { type: String, required: true },
    votes: { type: Number, default: 1 },
    nationalId: {
      type: String,
      unique: true,
      required: true,
    },
    profilePicture: {
      type: String,
      required: true,
    },
    gender: {
      type: String,
      enum: ['MALE', 'FEMALE'],
    },
    mission: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Candidate', CandidateSchema);
