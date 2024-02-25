const router = require('express').Router();
const {
  getThoughts,
  getSingleThought,
  createThought,
  deleteThought,
  addReaction,
  removeReaction,
} = require('../../controllers/UserController');

// /api/thoughts
router.route('/').get(getThoughts).post(createThought);

// /api/thoughts/:thoughtId
router.route('/:studentId').get(getSingleThought).delete(deleteThought);

// /api/thoughts/:thoughtId/reaction
router.route('/:studentId/assignments').post(addReaction);

// /api/thoughts/:thoughtId/reaction/:reactionId
router.route('/:studentId/assignments/:assignmentId').delete(removeReaction);

module.exports = router