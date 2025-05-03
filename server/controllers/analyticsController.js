
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