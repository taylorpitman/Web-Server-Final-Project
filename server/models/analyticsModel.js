// models/analyticsModel.js
const { CustomError, statusCodes } = require('./errors');
const { connect } = require('./supabase');

const TABLE_NAME = 'analytics';

const analyticsModel = {
  async createAnalytic(analyticsData) {
    const { data, error } = await connect().from(TABLE_NAME).insert(analyticsData).select();
    if (error) {
      console.error('Error creating analytic:', error);
      throw new CustomError('Failed to create analytic', statusCodes.BAD_REQUEST);
    }        return data[0];
  },

  async getAllAnalytics() {
    const { data, error } = await connect().from(TABLE_NAME).select('*');
    if (error) throw new CustomError('Failed to fetch analytics', statusCodes.BAD_REQUEST);
    return data;
  },

  async getAnalyticById(id) {
    const { data, error } = await connect().from(TABLE_NAME).select('*').eq('id', id).single();
    if (error) throw new CustomError('Analytics not found', statusCodes.NOT_FOUND);
    return data;
  },

  async updateAnalytics(id, updatedData) {
    const { data, error } = await connect().from(TABLE_NAME).update(updatedData).eq('id', id).select();
    if (error) throw new CustomError('Failed to update analytics', statusCodes.BAD_REQUEST);
    return data[0];
  },

  async deleteAnalytics(id) {
    const { error } = await connect().from(TABLE_NAME).delete().eq('id', id);
    if (error) throw new CustomError('Failed to delete analytics', statusCodes.BAD_REQUEST);
    return { success: true };
  },

  //getAnalyticsByUserAndDate(userId, date) → used to calculate daily totals
  async getAnalyticsByUserAndDate(userId, date) {
    const { data, error } = await connect()
      .from(TABLE_NAME)
      .select('*')
      .eq('user_id', userId)
      .eq('date', date)
      .single();

    if (error) 
        throw new CustomError('Analytics not found for this user and date', statusCodes.NOT_FOUND);
    return data;
  },

  //incrementStreak(userId) → increment streak_count if user studied yesterday too
  async incrementStreak(userId, date) {
    const db = connect();
  
    // Step 1: Fetch current streak count
    const { data: current, error: fetchError } = await db
      .from(TABLE_NAME)
      .select('streak_count')
      .eq('user_id', userId)
      .eq('date', date)
      .single();
  
    if (fetchError && fetchError.code !== 'PGRST116') {
      console.error('🔴 Fetch error:', fetchError);
      throw new CustomError('Failed to fetch streak count', statusCodes.BAD_REQUEST);
    }
  
    const newCount = (current?.streak_count || 0) + 1;
  
    // Step 2: Update streak count
    const { data, error } = await db
      .from(TABLE_NAME)
      .update({ streak_count: newCount })
      .eq('user_id', userId)
      .eq('date', date)
      .select();
  
    if (error) {
      console.error('🔴 Update error:', error);
      throw new CustomError('Failed to increment streak', statusCodes.BAD_REQUEST);
    }
  
    return data[0];
  },
  

  //resetStreak(userId) → reset to 1 if they broke the streak
    async resetStreak(userId) {
        const { data, error } = await connect()
        .from(TABLE_NAME)
        .update({ streak_count: 1 })
        .eq('user_id', userId)
        .select();
    
        if (error) throw new CustomError('Failed to reset streak', statusCodes.BAD_REQUEST);
        return data[0];
    },
};

module.exports = analyticsModel;
