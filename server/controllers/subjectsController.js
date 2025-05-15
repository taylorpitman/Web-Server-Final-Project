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

// Get all subjects
exports.getAllSubjects = async (req, res, next) => {
  try {
    const subjects = await subjectModel.getAllSubjects();
    res.status(statusCodes.OK).json(subjects);
  } catch (error) {
    console.error('Error fetching all subjects:', error);
    next(error);
  }
};

// Get subject by ID
exports.getSubjectById = async (req, res, next) => {
  try {
    const subject = await subjectModel.getSubjectById(req.params.id);
    if (!subject) {
      throw new CustomError('Subject not found', statusCodes.NOT_FOUND);
    }
    res.status(statusCodes.OK).json(subject);
  } catch (error) {
    console.error('Error fetching subject by ID:', error);
    next(error);
  }
};

// Update subject by ID
exports.updateSubject = async (req, res, next) => {
  try {
    const subject = await subjectModel.updateSubject(req.params.id, req.body);
    res.status(statusCodes.OK).json(subject);
  } catch (error) {
    console.error('Error updating subject:', error);
    next(error);
  }
};

// Delete subject by ID
exports.deleteSubject = async (req, res, next) => {
  try {
    const subject = await subjectModel.deleteSubject(req.params.id);
    res.status(statusCodes.OK).json(subject);
  } catch (error) {
    console.error('Error deleting subject:', error);
    next(error);
  }
};

//Search subjects
exports.searchSubjects = async (req, res, next) => {
  try {
    const { id, query } = req.params;
    const subjects = await subjectModel.searchSubjects(query, id);
    res.status(statusCodes.OK).json(subjects);
  } catch (error) {
    console.error('Error searching subjects:', error);
    next(error);
  }
};


