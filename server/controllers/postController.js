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

// Get all posts
exports.getAllPosts = async (req, res, next) => {
  try {
    const posts = await postModel.getAllPosts();
    res.status(statusCodes.OK).json(posts);
  } catch (error) {
    console.error('Get all posts error:', error);
    next(error);
  }
};

// Get a post by ID
exports.getPostById = async (req, res, next) => {
  try {
    const post = await postModel.getPostById(req.params.id);
    if (!post) {
      throw new CustomError('Post not found', statusCodes.NOT_FOUND);
    }
    res.status(statusCodes.OK).json(post);
  } catch (error) {
    console.error('Get post by ID error:', error);
    next(error);
  }
};

// Update a post by ID
exports.updatePost = async (req, res, next) => {
  try {
    const updatedPost = await postModel.updatePost(req.params.id, req.body);
    if (!updatedPost) {
      throw new CustomError('Post not found', statusCodes.NOT_FOUND);
    }
    res.status(statusCodes.OK).json(updatedPost);
  } catch (error) {
    console.error('Update post error:', error);
    next(error);
  }
};

// Delete a post by ID
exports.deletePost = async (req, res, next) => {
  try {
    const deletedPost = await postModel.deletePost(req.params.id);
    if (!deletedPost) {
      throw new CustomError('Post not found', statusCodes.NOT_FOUND);
    }
    res.status(statusCodes.NO_CONTENT).send();
  } catch (error) {
    console.error('Delete post error:', error);
    next(error);
  }
};




