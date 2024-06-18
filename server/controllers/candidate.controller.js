const Candidate = require('../models/candidate.model');
const User = require('../models/user.model');
const Poll = require('../models/poll.model');

exports.createCandidate = async (req, res) => {
  try {
    const pollToRunIn = await Poll.findById(req.body.poll);

    if (!pollToRunIn)
      return res.status(400).send({ message: 'Poll does not exist' });

    const newCandidate = new Candidate(req.body);

    await newCandidate.save();

    await Poll.findOneAndUpdate(
      { _id: req.body.poll_id },
      { $push: { candidates: { $each: [newCandidate._id] } } }
    );

    // pollToRunIn.candidates.push(newCandidate._id);

    return res
      .status(201)
      .send({ message: 'Candidate created!', data: newCandidate });
  } catch (error) {
    return res.status(400).send(error.message);
  }
};

exports.updateCandidate = async (req, res) => {
  try {
    const candidate = await Candidate.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      }
    );
    if (!candidate) {
      return res.status(400).send({ message: 'Candidate does not exist' });
    }
    res.status(200).json({ message: 'Candidate updated!', data: candidate });
  } catch (error) {
    res.status(500).json({ success: false, message: error });
  }
};

exports.getCandidatesByPoll = async (req, res) => {
  try {
    const candidates = await Candidate.find({
      poll_id: req.params.poll_id,
    }).populate('poll');
    return res
      .status(200)
      .send({ message: 'Candidates retrieved!', data: candidates });
  } catch (error) {
    return res.status(400).send(error.message);
  }
};
