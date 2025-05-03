const express = require('express');
const router = express.Router();
const subjectController = require('../controllers/subjectsController');

router.post('/create', subjectController.createSubject);

module.exports = router;
