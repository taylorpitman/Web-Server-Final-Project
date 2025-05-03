const express = require('express');
const router = express.Router();
const friendController = require('../controllers/friendsController'); // Changed from import to require

router.post('/create', friendController.createFriend);
router.get('/', friendController.getAllFriends);
router.get('/:id', friendController.getFriendById);
router.put('/:id', friendController.updateFriend);
router.delete('/:id', friendController.deleteFriend);
module.exports = router;