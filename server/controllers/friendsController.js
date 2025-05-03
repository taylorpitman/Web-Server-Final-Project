const friendModel = require('../models/friendsModel');
const { CustomError, statusCodes } = require('../models/errors');

// Create a new friend
exports.createFriend = async (req, res, next) => {
  try {
    console.log('req.body:', req.body);
    const friend = await friendModel.createFriend(req.body);
    res.status(statusCodes.CREATED).json(friend);
  } catch (error) {
    console.error('Create friend error:', error);
    next(error);
  }
};

// Get all friends
exports.getAllFriends = async (req, res, next) => {
  try {
    const friends = await friendModel.getAllFriends();
    res.status(statusCodes.OK).json(friends);
  } catch (error) {
    console.error('Get all friends error:', error);
    next(error);
  }
};

// Get a friend by ID
exports.getFriendById = async (req, res, next) => {
  try {
    const friend = await friendModel.getFriendById(req.params.id);
    if (!friend) {
      throw new CustomError('Friend not found', statusCodes.NOT_FOUND);
    }
    res.status(statusCodes.OK).json(friend);
  } catch (error) {
    console.error('Get friend by ID error:', error);
    next(error);
  }
};

// Update a friend by ID
exports.updateFriend = async (req, res, next) => {
  try {
    const updatedFriend = await friendModel.updateFriend(req.params.id, req.body);
    if (!updatedFriend) {
      throw new CustomError('Friend not found', statusCodes.NOT_FOUND);
    }
    res.status(statusCodes.OK).json(updatedFriend);
  } catch (error) {
    console.error('Update friend error:', error);
    next(error);
  }
};

// Delete a friend by ID
exports.deleteFriend = async (req, res, next) => {
  try {
    const deletedFriend = await friendModel.deleteFriend(req.params.id);
    if (!deletedFriend) {
      throw new CustomError('Friend not found', statusCodes.NOT_FOUND);
    }
    res.status(statusCodes.NO_CONTENT).send();
  } catch (error) {
    console.error('Delete friend error:', error);
    next(error);
  }
};
