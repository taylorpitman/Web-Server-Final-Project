const express = require('express');
const router = express.Router();
const sessionController = require('../controllers/sessionController');
const authenticate = require('../middleware/authMiddleware');

router.use(authenticate);

router.post('/create', sessionController.createSession);

router.get('/all', sessionController.getAllSessions);
router.get('/user', sessionController.getSessionsByUser);
router.get('/active', sessionController.getActiveSessionByUser);
router.get('/:id', sessionController.getSessionById);
router.put('/:id', sessionController.updateSession);
router.patch('/:id/end', sessionController.endSession);
router.delete('/:id', sessionController.deleteSession);

module.exports = router;
