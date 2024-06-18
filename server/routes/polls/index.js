const { Router } = require('express');
const pollsController = require('../../controllers/poll.controller');
const { isAdmin } = require('../../middlewares/isAdmin');

const router = Router();

router.get('/', pollsController.getPolls);
router.post('/', pollsController.createPoll);
router.get('/:status', pollsController.getPollsByStatus);
router.post(`/candidate/vote`, pollsController.voteCandidate);

module.exports = router;
