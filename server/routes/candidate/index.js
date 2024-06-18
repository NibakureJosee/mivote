const { Router } = require('express');
const candidatesController = require('../../controllers/candidate.controller');
const { isAdmin } = require('../../middlewares/isAdmin');

const router = Router();

router.post('/', candidatesController.createCandidate);
router.get('/:poll_id', candidatesController.getCandidatesByPoll);
router.put('/:poll_id', candidatesController.updateCandidate);

module.exports = router;
