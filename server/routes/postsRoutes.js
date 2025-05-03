const express = require('express');
const router = express.Router();
const postController = require('../controllers/postController'); // Changed from import to require

router.post('/create', postController.createPost);

module.exports = router;