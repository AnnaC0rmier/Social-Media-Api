const router = require('express').Router();
const {
  getUsers,
  getSingleUser,
  createUser,
  deleteUser,
  addFriend,
  removeFriend,
} = require('../../controllers/UserController');

// /api/users
router.route('/').get(getUsers).post(createUser);

// /api/users/:userId
router.route('/:studentId').get(getSingleUser).delete(deleteUser);

// /api/users/:userId/Friends
router.route('/:studentId/assignments').post(addFriend);

// /api/users/:userId/friends/:friendId
router.route('/:studentId/assignments/:assignmentId').delete(removeFriend);

module.exports = router
