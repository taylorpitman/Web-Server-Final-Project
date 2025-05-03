

const sessionModel = require('../models/sessionsModel');
const { CustomError, statusCodes } = require('../models/errors');

// Create a new session
exports.createSession = async (req, res, next) => {
  try {
    console.log('req.body:', req.body);
    const session = await sessionModel.createSession(req.body);
    res.status(statusCodes.CREATED).json(session);
  } catch (error) {
    console.error('Create session error:', error);
    next(error);
  }
};


// Get all sessions (dev/debug)
exports.getAllSessions = async (req, res, next) => {
  try {
    const sessions = await sessionModel.getAllSessions();
    res.status(statusCodes.OK).json(sessions);
  } catch (error) {
    next(error);
  }
};


// Get active session for current user
exports.getActiveSessionByUser = async (req, res, next) => {
  try {
    const session = await sessionModel.getActiveSessionByUser(req.params.id);
    res.status(statusCodes.OK).json(session);
  } catch (error) {
    next(error);
  }
};

// Get session by ID
exports.getSessionById = async (req, res, next) => {
  try {
    const session = await sessionModel.getSessionById(req.params.id);
    res.status(statusCodes.OK).json(session);
  } catch (error) {
    next(error);
  }
};

// Update session by ID
exports.updateSession = async (req, res, next) => {
  try {
    const session = await sessionModel.updateSession(req.params.id, req.body);
    res.status(statusCodes.OK).json(session);
  } catch (error) {
    next(error);
  }
};

// End session (set end_time + is_active = false)
exports.endSessionById = async (req, res, next) => {
  try {
    const session = await sessionModel.endSessionById(req.params.id);
    res.status(statusCodes.OK).json(session);
  } catch (error) {
    next(error);
  }
};

// Delete session
exports.deleteSession = async (req, res, next) => {
  try {
    await sessionModel.deleteSession(req.params.id);
    res.status(statusCodes.NO_CONTENT).send();
  } catch (error) {
    next(error);
  }
};

// Get summary for a specific date (Pomodoro totals)
exports.getSessionSummaryForDate = async (req, res, next) => {
  try {
    const summary = await sessionModel.getSessionSummaryForDate(req.user.id, req.params.date);
    res.status(statusCodes.OK).json(summary);
  } catch (error) {
    next(error);
  }
};

