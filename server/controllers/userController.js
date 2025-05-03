const userModel = require('../models/userModel');
const { CustomError, statusCodes } = require('../models/errors');


// Create a new user
exports.createUser = async (req, res, next) => {
  try {
    const user = await userModel.createUser(req.body);
    res.status(statusCodes.CREATED).json(user);
  } catch (error) {
    console.error('Error creating user:', error);
    next(error);
  }
};
