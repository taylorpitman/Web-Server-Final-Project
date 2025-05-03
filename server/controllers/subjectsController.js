
const subjectModel = require('../models/subjectsModel');
const { CustomError, statusCodes } = require('../models/errors');


// Create a new subject
exports.createSubject = async (req, res, next) => {
  try {
    const user = await subjectModel.createSubject(req.body);
    res.status(statusCodes.CREATED).json(user);
  } catch (error) {
    console.error('Error creating subject:', error);
    next(error);
  }
};
