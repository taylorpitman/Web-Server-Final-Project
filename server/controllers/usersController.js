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

//get user subjects
exports.getUserSubjects = async (req, res, next) => {
  try {
    const subjects = await userModel.getUserSubjects(req.params.id);
    if (!subjects) {
      throw new CustomError('User not found', statusCodes.NOT_FOUND);
    }
    res.status(statusCodes.OK).json(subjects);
  } catch (error) {
    console.error('Error fetching user subjects:', error);
    next(error);
  }
};

//get user friends
exports.getUserFriends = async (req, res, next) => {
  try {
    const friends = await userModel.getUserFriends(req.params.id);
    if (!friends) {
      throw new CustomError('User not found', statusCodes.NOT_FOUND);
    }
    res.status(statusCodes.OK).json(friends);
  } catch (error) {
    console.error('Error fetching user friends:', error);
    next(error);
  }
};

//get user posts
exports.getUserPosts = async (req, res, next) => {
  try {
    const posts = await userModel.getUserPosts(req.params.id);
    if (!posts) {
      throw new CustomError('User not found', statusCodes.NOT_FOUND);
    }
    res.status(statusCodes.OK).json(posts);
  } catch (error) {
    console.error('Error fetching user posts:', error);
    next(error);
  }
};

// Get online friends
exports.getOnlineFriends = async (req, res, next) => {
  try {
    const onlineFriends = await userModel.getOnlineFriends(req.params.id);
    if (!onlineFriends) {
      throw new CustomError('User not found', statusCodes.NOT_FOUND);
    }
    res.status(statusCodes.OK).json(onlineFriends);
  } catch (error) {
    console.error('Error fetching online friends:', error);
    next(error);
  }
};

// Get friend requests
exports.getFriendRequests = async (req, res, next) => {
  try {
    const friendRequests = await userModel.getFriendRequests(req.params.id);
    if (!friendRequests) {
      throw new CustomError('User not found', statusCodes.NOT_FOUND);
    }
    res.status(statusCodes.OK).json(friendRequests);
  } catch (error) {
    console.error('Error fetching friend requests:', error);
    next(error);
  }
};

// Get user analytics
exports.getUserAnalytics = async (req, res, next) => {
  try {
    const analytics = await userModel.getUserAnalytics(req.params.id);
    if (!analytics) {
      throw new CustomError('User not found', statusCodes.NOT_FOUND);
    }
    res.status(statusCodes.OK).json(analytics);
  } catch (error) {
    console.error('Error fetching user analytics:', error);
    next(error);
  }
};

// Update a user
exports.updateUser = async (req, res, next) => {
  try {
    const updatedUser = await userModel.updateUser(req.params.id, req.body);
    if (!updatedUser) {
      throw new CustomError('User not found', statusCodes.NOT_FOUND);
    }
    res.status(statusCodes.OK).json(updatedUser);
  } catch (error) {
    console.error('Error updating user:', error);
    next(error);
  }
};

// Delete a user
exports.deleteUser = async (req, res, next) => {
  try {
    const result = await userModel.deleteUser(req.params.id);
    res.status(statusCodes.OK).json(result);
  } catch (error) {
    console.error('Error deleting user:', error);
    next(error);
  }
};

// Send a friend request
exports.sendFriendRequest = async (req, res, next) => {
  try {
    const result = await userModel.sendFriendRequest(req.params.id, req.params.friendId);
    res.status(statusCodes.OK).json(result);
  } catch (error) {
    console.error('Error sending friend request:', error);
    next(error);
  }
};

// Accept a friend request
exports.acceptFriendRequest = async (req, res, next) => {
  try {
    const result = await userModel.acceptFriendRequest(req.params.id, req.params.friendId);
    res.status(statusCodes.OK).json(result);
  } catch (error) {
    console.error('Error accepting friend request:', error);
    next(error);
  }
};

// Decline a friend request
exports.declineFriendRequest = async (req, res, next) => {
  try {
    const result = await userModel.declineFriendRequest(req.params.id, req.params.friendId);
    res.status(statusCodes.OK).json(result);
  } catch (error) {
    console.error('Error declining friend request:', error);
    next(error);
  }
};

// Remove a friend
exports.removeFriend = async (req, res, next) => {
  try {
    const result = await userModel.removeFriend(req.params.id, req.params.friendId);
    res.status(statusCodes.OK).json(result);
  } catch (error) {
    console.error('Error removing friend:', error);
    next(error);
  }
};

// Remove a subject from a user
exports.removeSubjectFromUser = async (req, res, next) => {
  try {
    const result = await userModel.removeSubjectFromUser(req.params.id, req.params.subjectId);
    res.status(statusCodes.OK).json(result);
  } catch (error) {
    console.error('Error removing subject from user:', error);
    next(error);
  }
};

// Search users
exports.searchUsers = async (req, res, next) => {
  try {
    const users = await userModel.searchUsers(req.params.term);
    res.status(statusCodes.OK).json(users);
  } catch (error) {
    console.error('Error searching users:', error);
    next(error);
  }
};

