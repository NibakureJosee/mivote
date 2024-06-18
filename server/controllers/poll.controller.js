const Candidate = require('../models/candidate.model');
const Poll = require('../models/poll.model');
const UserPoll = require('../models/userpoll.model');

exports.createPoll = async (req, res) => {
  try {
    //create a poll
    const newPoll = new Poll(req.body);
    await newPoll.save();
    return res.status(201).send({ message: 'Poll created!', data: newPoll });
  } catch (error) {
    return res.status(400).send(error.message);
  }
};

exports.getPolls = async (req, res) => {
  try {
    const polls = await Poll.find().populate('candidates').populate('author');
    return res.status(200).send({ message: 'Polls retrieved!', data: polls });
  } catch (error) {
    return res.status(400).send(error.message);
  }
};

exports.getPollsByStatus = async (req, res) => {
  try {
    const polls = await Poll.find({ status: req.params.status })
      .populate('candidates')
      .populate('author');
    return res.status(200).send({ message: 'Polls retrieved!', data: polls });
  } catch (error) {
    return res.status(400).send(error.message);
  }
};

exports.voteCandidate = async (req, res) => {
  try {
    const userPoll = await UserPoll.findOne({
      user: req.body.user,
      poll: req.body.poll,
      status: 'HAS_VOTED',
    });
    if (userPoll)
      return res.status(400).send({ message: 'User has already voted' });

    const isUserinCurrentPoll = await Poll.find({
      _id: req.body.poll,
      candidates: { $in: [req.body.candidate] },
    });

    if (isUserinCurrentPoll.length == 0)
      return res
        .status(404)
        .send({ message: "Candidate not found in poll's candidates" });

    const votedCandidate = await Candidate.findOneAndUpdate({
      user: req.body.user,
      $inc: {
        votes: 1,
      },
    });

    const newUserPoll = new UserPoll(req.body);
    newUserPoll.status = 'HAS_VOTED';
    await newUserPoll.save();

    return res
      .status(200)
      .send({ message: 'User voted successfully', data: votedCandidate });
  } catch (error) {
    res.status(400).send(error.message);
  }
};
