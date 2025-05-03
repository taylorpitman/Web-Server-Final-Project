const express = require('express');
const router = express.Router();
const friendController = require('../controllers/friendsController'); // Changed from import to require

router.post('/create', friendController.createFriend);

module.exports = router;