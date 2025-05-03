const userModel = require('../models/usersModel');
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

// Get all users
exports.getAllUsers = async (req, res, next) => {
  try {
    const users = await userModel.getAllUsers();
    res.status(statusCodes.OK).json(users);
  } catch (error) {
    console.error('Error fetching all users:', error);
    next(error);
  }
};

// Get user by ID 
exports.getUserById = async (req, res, next) => {
  try {
    const user = await userModel.getUserById(req.params.id);
    if (!user) {
      throw new CustomError('User not found', statusCodes.NOT_FOUND);
    }
    res.status(statusCodes.OK).json(user);
  } catch (error) {
    console.error('Error fetching user by ID:', error);
    next(error);
  }
};

