const express = require('express');
const router = express.Router();
const sessionController = require('../controllers/sessionsController'); // Changed from import to require

router.post('/create', sessionController.createSession);
router.get('/', sessionController.getAllSessions);
router.get('/active/:id', sessionController.getActiveSessionByUser);
router.get('/:id', sessionController.getSessionById);
router.put('/:id', sessionController.updateSession);
router.patch('/:id', sessionController.endSessionById); // Corrected function name
router.delete('/:id', sessionController.deleteSession);

module.exports = router;
