const express = require('express');
const router = express.Router();
const postController = require('../controllers/postController'); // Changed from import to require

router.post('/create', postController.createPost);
router.get('/', postController.getAllPosts);
router.get('/:id', postController.getPostById);
router.put('/:id', postController.updatePost);
router.delete('/:id', postController.deletePost);
router.patch('/:id/like', postController.updateLikes);
router.get('/:id/subject', postController.getPostSubject);
module.exports = router;