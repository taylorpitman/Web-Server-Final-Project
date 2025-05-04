// models/userModel.js
const { CustomError, statusCodes } = require('./errors');
const { connect } = require('./supabase');

const TABLE_NAME = 'users';

const userModel = {
  async createUser(userData) {
    console.log('Creating user:', userData);
    const { data, error } = await connect().from(TABLE_NAME).insert(userData).select();
    if (error) throw new CustomError('Failed to create user', statusCodes.BAD_REQUEST);
    return data[0];
  },

  async getAll(limit = 30, offset = 0, sort = 'id', order = 'desc') {
    const query = connect().from('users')
      .select('*', { count: 'exact' }) // important
      .order(sort, { ascending: order === 'asc' })
      .range(offset, offset + limit - 1);
  
    const { data, count, error } = await query;
  
    if (error) throw error;
  
    return {
      items: data,
      total: count,
      skip: offset,
      limit
    };
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

  async getUserByEmail(email) {
    const { data, error } = await connect().from(TABLE_NAME).select('*').eq('email', email).single();
    if (error) throw new CustomError('User not found', statusCodes.NOT_FOUND);
    return data;
  },

  async getUserSubjects(userId) {
    const { data, error } = await connect()
      .from('subjects')
      .select('*')
      .eq('user_id', userId);
    if (error) throw new CustomError('Failed to fetch user subjects', statusCodes.BAD_REQUEST);
    return data;
  },

  async getUserFriends(userId) {
    const { data, error } = await connect()
      .from('friends')
      .select('*, users!friends_friend_id_fkey(*)')
      .eq('user_id', userId);
    if (error) throw new CustomError('Failed to fetch user friends', statusCodes.BAD_REQUEST);
    return data.map(row => row.users); // Map to return friend details
  },

  async getUserPosts(userId) {
    const { data, error } = await connect()
      .from('posts')
      .select('*')
      .eq('user_id', userId);
    if (error) throw new CustomError('Failed to fetch user posts', statusCodes.BAD_REQUEST);
    return data;
  },

  async getOnlineFriends(userId) {
    const { data, error } = await connect()
      .from('friends')
      .select('*, users!friends_friend_id_fkey(*)') // Assuming a foreign key relationship
      .eq('user_id', userId)
      .eq('users.is_online', true);
    if (error) throw new CustomError('Failed to fetch online friends', statusCodes.BAD_REQUEST);
    return data.map(row => row.users); // Map to return friend details
  },

  async getFriendRequests(userId) {
    const { data, error } = await connect()
      .from('friends')
      .select('*, users!friends_friend_id_fkey(*)') // Assuming a foreign key relationship
      .eq('friend_id', userId)
      .eq('status', 'pending');
    if (error) throw new CustomError('Failed to fetch friend requests', statusCodes.BAD_REQUEST);
    return data.map(row => row.users); // Map to return requester details
  },

  async getUserAnalytics(userId) {
    const { data, error } = await connect()
      .from('analytics')
      .select('*')
      .eq('user_id', userId);
    if (error) throw new CustomError('Failed to fetch user analytics', statusCodes.BAD_REQUEST);
    return data;
  },

  async sendFriendRequest(userId, friendId) {
    const { data, error } = await connect()
      .from('friends')
      .insert({ user_id: userId, friend_id: friendId, status: 'pending' })
      .select();
    if (error) throw new CustomError('Failed to send friend request', statusCodes.BAD_REQUEST);
    return data[0];
  },

  async acceptFriendRequest(userId, friendId) {
    const { data, error } = await connect()
      .from('friends')
      .update({ status: 'accepted' })
      .eq('user_id', friendId)
      .eq('friend_id', userId)
      .select();
    if (error) throw new CustomError('Failed to accept friend request', statusCodes.BAD_REQUEST);
    return data[0];
  },

  async declineFriendRequest(userId, friendId) {
    const { error } = await connect()
      .from('friends')
      .delete()
      .eq('user_id', friendId)
      .eq('friend_id', userId);
    if (error) throw new CustomError('Failed to decline friend request', statusCodes.BAD_REQUEST);
    return { success: true };
  },

  async removeFriend(userId, friendId) {
    const { error } = await connect()
      .from('friends')
      .delete()
      .or(`(user_id.eq.${userId},friend_id.eq.${friendId})`)
      .or(`(user_id.eq.${friendId},friend_id.eq.${userId})`);
    if (error) throw new CustomError('Failed to remove friend', statusCodes.BAD_REQUEST);
    return { success: true };
  },

  async removeSubjectFromUser(userId, subjectId) {
    const { error } = await connect()
      .from('subjects')
      .delete()
      .eq('user_id', userId)
      .eq('id', subjectId);
    if (error) throw new CustomError('Failed to remove subject from user', statusCodes.BAD_REQUEST);
    return { success: true };
  },

  async searchUsers(term) {
    const { data, error } = await connect()
      .from(TABLE_NAME)
      .select('*')
      .ilike('username', `%${term}%`);
    if (error) throw new CustomError('Failed to search users', statusCodes.BAD_REQUEST);
    return data;
  }
};

module.exports = userModel;
