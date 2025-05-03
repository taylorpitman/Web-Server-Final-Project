// models/userModel.js
const { CustomError, statusCodes } = require('./errors');
const { connect } = require('./supabase');

const TABLE_NAME = 'user';

const userModel = {
  async createUser(userData) {
    console.log('Creating user:', userData);
    const { data, error } = await connect().from(TABLE_NAME).insert(userData).select();
    if (error) throw new CustomError('Failed to create user', statusCodes.BAD_REQUEST);
    return data[0];
  },

  async getAllUser() {
    const { data, error } = await connect().from(TABLE_NAME).select('*');
    if (error) throw new CustomError('Failed to fetch user', statusCodes.BAD_REQUEST);
    return data;
  },

  async getUserById(id) {
    const { data, error } = await connect().from(TABLE_NAME).select('*').eq('id', id).single();
    if (error) throw new CustomError('User not found', statusCodes.NOT_FOUND);
    return data;
  },

  async updateUser(id, updatedData) {
    const { data, error } = await connect().from(TABLE_NAME).update(updatedData).eq('id', id).select();
    if (error) throw new CustomError('Failed to update user', statusCodes.BAD_REQUEST);
    return data[0];
  },

  async deleteUser(id) {
    const { error } = await connect().from(TABLE_NAME).delete().eq('id', id);
    if (error) throw new CustomError('Failed to delete user', statusCodes.BAD_REQUEST);
    return { success: true };
  },

  //getUserByEmail(email) → for login/auth
  async getUserByEmail(email) {
    const { data, error } = await connect().from(TABLE_NAME).select('*').eq('email', email).single();
    if (error) throw new CustomError('User not found', statusCodes.NOT_FOUND);
    return data;
  },

  //getOnlineFriends(userId) → join with friends table, return only online users
  async getOnlineFriends(userId) {
    const { data, error } = await connect()
      .from(TABLE_NAME)
      .select('*, friends!inner(*)')
      .eq('friends.user_id', userId)
      .eq('friend.is_online', true);

    if (error) throw new CustomError('Failed to fetch online friends', statusCodes.BAD_REQUEST);
    return data.map(row => row.friend); 
    
  },
    //setUserOnlineStatus(userId, status) → update boolean is_online 
    async setUserOnlineStatus(userId, status) {
        const { data, error } = await connect()
            .from(TABLE_NAME)
            .update({ is_online: status })
            .eq('id', userId)
            .select();
        if (error) throw new CustomError('Failed to update online status', statusCodes.BAD_REQUEST);
        return data[0];
    }
};

module.exports = userModel;
