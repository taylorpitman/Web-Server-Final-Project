const express = require('express');
const router = express.Router();
const analyticsController = require('../controllers/analyticsController');



router.post('/create', analyticsController.createAnalytic);
router.get('/', analyticsController.getAllAnalytics);
router.get('/:id', analyticsController.getAnalyticById);
router.get('/:id/streak', analyticsController.getStreak);
router.put('/:id', analyticsController.updateAnalytics);
router.patch('/:id', analyticsController.updateAnalytics);
router.patch('/:id/increment-streak', analyticsController.incrementStreak);
router.delete('/:id', analyticsController.deleteAnalytics);

module.exports = router;
