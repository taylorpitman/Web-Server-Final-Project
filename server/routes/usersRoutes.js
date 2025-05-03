const express = require('express');
const router = express.Router();
const userController = require('../controllers/usersController');

router.post('/create', userController.createUser);

router.get('/', userController.getAllUsers);
router.get('/:id', userController.getUserById);
router.get('/:id/subjects', userController.getUserSubjects);
router.get('/:id/friends', userController.getUserFriends);
router.get('/:id/friends/online', userController.getOnlineFriends);
router.get('/:id/friends/requests', userController.getFriendRequests);
router.get('/:id/posts', userController.getUserPosts);
router.get('/:id/analytics', userController.getUserAnalytics);

router.patch('/:id', userController.updateUser);
router.delete('/:id', userController.deleteUser);

router.post('/:id/friends/:friendId/request', userController.sendFriendRequest);
router.post('/:id/friends/:friendId/accept', userController.acceptFriendRequest);
router.delete('/:id/friends/:friendId/decline', userController.declineFriendRequest);
router.delete('/:id/friends/:friendId', userController.removeFriend);

router.delete('/:id/friends/:friendId', userController.removeFriend);
router.delete('/:id/subjects/:subjectId', userController.removeSubjectFromUser);

router.get('/search/:term', userController.searchUsers);

module.exports = router;
