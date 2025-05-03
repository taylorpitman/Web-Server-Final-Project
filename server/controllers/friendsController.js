

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
