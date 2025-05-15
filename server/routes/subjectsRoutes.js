const express = require('express');
const router = express.Router();
const subjectController = require('../controllers/subjectsController');

router.post('/create', subjectController.createSubject);
router.get('/search/:id/:query', subjectController.searchSubjects);
router.get('/', subjectController.getAllSubjects);
router.get('/:id', subjectController.getSubjectById);
router.put('/:id', subjectController.updateSubject);
router.delete('/:id', subjectController.deleteSubject);


module.exports = router;
