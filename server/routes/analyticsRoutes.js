const express = require('express');
const router = express.Router();
const analyticsController = require('../controllers/analyticsController');
const authenticate = require('../middleware/authMiddleware');

router.use(authenticate);

// router.post('/create', analyticsController.createAnalytics);

// router.get('/all', analyticsController.getAllAnalyticss);
// router.get('/user', analyticsController.getAnalyticssByUser);
// router.get('/user/:userId/date/:date', analyticsController.getAnalyticsByUserAndDate);
// router.put('/:id', analyticsController.updateAnalytics);
// router.patch('/:id/increment-streak', analyticsController.incrementStreak);
// router.delete('/:id', analyticsController.deleteAnalytics);

module.exports = router;
