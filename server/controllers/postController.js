

const postModel = require('../models/postsModel');
const { CustomError, statusCodes } = require('../models/errors');

// Create a new post
exports.createPost = async (req, res, next) => {
  try {
    console.log('req.body:', req.body);
    const post = await postModel.createPost(req.body);
    res.status(statusCodes.CREATED).json(post);
  } catch (error) {
    console.error('Create post error:', error);
    next(error);
  }
};



