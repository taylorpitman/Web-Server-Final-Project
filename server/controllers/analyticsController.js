const analyticModel = require('../models/analyticsModel');
const { CustomError, statusCodes } = require('../models/errors');

// Create a new analytic
exports.createAnalytic = async (req, res, next) => {
  try {
    console.log('req.body:', req.body);
    const analytic = await analyticModel.createAnalytic(req.body);
    res.status(statusCodes.CREATED).json(analytic);
  } catch (error) {
    console.error('Create analytic error:', error);
    next(error);
  }
};

// Get all analytics
exports.getAllAnalytics = async (req, res, next) => {
  try {
    const analytics = await analyticModel.getAllAnalytics();
    res.status(statusCodes.OK).json(analytics);
  } catch (error) {
    console.error('Get all analytics error:', error);
    next(error);
  }
};

// Get an analytic by ID
exports.getAnalyticById = async (req, res, next) => {
  try {
    const analytic = await analyticModel.getAnalyticById(req.params.id);
    if (!analytic) {
      throw new CustomError('Analytic not found', statusCodes.NOT_FOUND);
    }
    res.status(statusCodes.OK).json(analytic);
  } catch (error) {
    console.error('Get analytic by ID error:', error);
    next(error);
  }
};

//get streak
exports.getStreak = async (req, res, next) => {
  try {
    const userId = req.params.id;
    const streak = await analyticModel.getStreak(userId);
    res.status(statusCodes.OK).json(streak);
  } catch (error) {
    console.error('Get streak error:', error);
    next(error);
  }
};
// Update an analytic
exports.updateAnalytics = async (req, res, next) => {
  try {
    const updatedAnalytic = await analyticModel.updateAnalytics(req.params.id, req.body);
    res.status(statusCodes.OK).json(updatedAnalytic);
  } catch (error) {
    console.error('Update analytic error:', error);
    next(error);
  }
};

// Increment streak
exports.incrementStreak = async (req, res, next) => {
  try {
    const userId = req.params.id;
    const { date } = req.body; // ← get date from request body

    const updatedAnalytic = await analyticModel.incrementStreak(userId, date);
    res.status(statusCodes.OK).json(updatedAnalytic);
  } catch (error) {
    console.error('Increment streak error:', error);
    next(error);
  }
};

// Delete an analytic
exports.deleteAnalytics = async (req, res, next) => {
  try {
    await analyticModel.deleteAnalytics(req.params.id);
    res.status(statusCodes.NO_CONTENT).send();
  } catch (error) {
    console.error('Delete analytic error:', error);
    next(error);
  }
};

exports.addStudyTime = async (req, res, next) => {
  try {
    const subjectId = parseInt(req.params.id);
    const { userId, study_time } = req.body;
    const updatedAnalytic = await analyticModel.addStudyTime(subjectId, userId, study_time);
    res.status(statusCodes.OK).json(updatedAnalytic);
  } catch (error) {
    console.error('Add study time error:', error);
    next(error);
  }
};