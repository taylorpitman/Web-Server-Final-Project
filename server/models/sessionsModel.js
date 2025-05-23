// models/sessionModel.js
const { CustomError, statusCodes } = require('./errors');
const { connect } = require('./supabase');

const TABLE_NAME = 'sessions';


const sessionModel = {

  async createSession(sessionData) {
    const { data, error } = await connect().from(TABLE_NAME).insert(sessionData).select('*');

    if (error) {
      throw new CustomError('Failed to create session', statusCodes.BAD_REQUEST);
    }

    if (!data || data.length === 0) {
      throw new CustomError('Session not created', statusCodes.INTERNAL_SERVER_ERROR);
    }

    return data[0];
  },

  async getAllSessions() {
    const { data, error } = await connect().from(TABLE_NAME).select('*');
    if (error) throw new CustomError('Failed to fetch session', statusCodes.BAD_REQUEST);
    return data;
  },

  async getSessionById(id) {
    const { data, error } = await connect().from(TABLE_NAME).select('*').eq('id', id).single();
    if (error) throw new CustomError('Session not found', statusCodes.NOT_FOUND);
    return data;
  },

  async updateSession(id, updatedData) {
    const { data, error } = await connect().from(TABLE_NAME).update(updatedData).eq('id', id).select();
    if (error) throw new CustomError('Failed to update session', statusCodes.BAD_REQUEST);
    return data[0];
  },

  async deleteSession(id) {
    const { error } = await connect().from(TABLE_NAME).delete().eq('id', id);
    if (error) throw new CustomError('Failed to delete session', statusCodes.BAD_REQUEST);
    return { success: true };
  },

  // getActiveSessionByUser(userId) → used to show Pomodoro timer if still running
    async getActiveSessionByUser(userId) {
        const { data, error } = await connect()
        .from(TABLE_NAME)
        .select('*')
        .eq('user_id', userId)
        .eq('is_active', true)
        .single();
    
        if (error) 
            throw new CustomError('No active session found for this user', statusCodes.NOT_FOUND);
        return data;
    },


  // endSessionById(sessionId) → auto-fill end_time, set is_active = false
    async endSessionById(sessionId) {
        const { data, error } = await connect()
        .from(TABLE_NAME)
        .update({ end_time: new Date(), is_active: false })
        .eq('id', sessionId)
        .select();
    
        if (error) 
            throw new CustomError('Failed to end session', statusCodes.BAD_REQUEST);
        return data[0];
    },

  // getSessionSummaryForDate(userId, date) → total minutes + count
    async getSessionSummaryForDate(userId, date) {
        const { data, error } = await connect()
        .rpc('get_session_summary_for_date', { input_user_id: userId, input_date: date });
    
        if (error) throw new CustomError('Failed to fetch session summary for this date', statusCodes.BAD_REQUEST);
        return data[0];
    },


    
};

module.exports = sessionModel;
