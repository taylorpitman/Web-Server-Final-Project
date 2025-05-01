// models/subjectModel.js
const { CustomError, statusCodes } = require('./errors');
const { connect } = require('./supabase');

const TABLE_NAME = 'subject';


const subjectModel = {
  async createSubject(subjectData) {
    const { data, error } = await connect().from(TABLE_NAME).insert(subjectData).select();
    if (error) throw new CustomError('Failed to create subject', statusCodes.BAD_REQUEST);
    return data[0];
  },

  async getAllSubject() {
    const { data, error } = await connect().from(TABLE_NAME).select('*');
    if (error) throw new CustomError('Failed to fetch subject', statusCodes.BAD_REQUEST);
    return data;
  },

  async getSubjectById(id) {
    const { data, error } = await connect().from(TABLE_NAME).select('*').eq('id', id).single();
    if (error) throw new CustomError('Subject not found', statusCodes.NOT_FOUND);
    return data;
  },

  async updateSubject(id, updatedData) {
    const { data, error } = await connect().from(TABLE_NAME).update(updatedData).eq('id', id).select();
    if (error) throw new CustomError('Failed to update subject', statusCodes.BAD_REQUEST);
    return data[0];
  },

  async deleteSubject(id) {
    const { error } = await connect().from(TABLE_NAME).delete().eq('id', id);
    if (error) throw new CustomError('Failed to delete subject', statusCodes.BAD_REQUEST);
    return { success: true };
  },

  // getSubjectsByUser(userId) → show only logged-in user’s custom subjects
    async getSubjectsByUser(userId) {
        const { data, error } = await connect().from(TABLE_NAME).select('*').eq('user_id', userId);
        if (error) 
            throw new CustomError('Failed to fetch subjects for this user', statusCodes.BAD_REQUEST);
        return data;
    },

  // getSessionsBySubject(subjectId) → optional, to break down time spent per subject
    async getSessionsBySubject(subjectId) {
        const { data, error } = await connect().from('sessions').select('*').eq('subject_id', subjectId);
        if (error) 
            throw new CustomError('Failed to fetch sessions for this subject', statusCodes.BAD_REQUEST);
        return data;
    },


};

module.exports = subjectModel;
