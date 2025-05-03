const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController'); // Changed from import to require

router.post('/create', userController.createUser);

module.exports = router;
