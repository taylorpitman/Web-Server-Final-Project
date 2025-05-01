// models/friendsModel.js
const { CustomError, statusCodes } = require('./errors');
const { connect } = require('./supabase');

const TABLE_NAME = 'friends';

const friendsModel = {
  async createFriends(friendsData) {
    const { data, error } = await connect().from(TABLE_NAME).insert(friendsData).select();
    if (error) throw new CustomError('Failed to create friends', statusCodes.BAD_REQUEST);
    return data[0];
  },

  async getAllFriends() {
    const { data, error } = await connect().from(TABLE_NAME).select('*');
    if (error) throw new CustomError('Failed to fetch friends', statusCodes.BAD_REQUEST);
    return data;
  },

  async getFriendsById(id) {
    const { data, error } = await connect().from(TABLE_NAME).select('*').eq('id', id).single();
    if (error) throw new CustomError('Friends not found', statusCodes.NOT_FOUND);
    return data;
  },

  async updateFriends(id, updatedData) {
    const { data, error } = await connect().from(TABLE_NAME).update(updatedData).eq('id', id).select();
    if (error) throw new CustomError('Failed to update friends', statusCodes.BAD_REQUEST);
    return data[0];
  },

  async deleteFriends(id) {
    const { error } = await connect().from(TABLE_NAME).delete().eq('id', id);
    if (error) throw new CustomError('Failed to delete friends', statusCodes.BAD_REQUEST);
    return { success: true };
  },

  //getFriendsByUser(userId) → basic friends list
    async getFriendsByUser(userId) {
        const { data, error } = await connect()
            .from(TABLE_NAME)
            .select('*')
            .eq('user_id', userId);

        if (error) 
            throw new CustomError('Failed to fetch friends for this user', statusCodes.BAD_REQUEST);
        return data;
    },

  //getPendingFriendRequests(userId) → for showing "Requests"
  async getPendingFriendRequests(userId) {
    const { data, error } = await connect()
      .from(TABLE_NAME)
      .select('*')
      .eq('friend_id', userId)
      .eq('status', 'pending');

    if (error) 
        throw new CustomError('Failed to fetch pending friend requests', statusCodes.BAD_REQUEST);
    return data;
  },

  //areFriends(userId, friendId) → boolean check to enforce UI logic
  async areFriends(userId, friendId) {  
    const { data, error } = await connect()
      .from(TABLE_NAME)
      .select('*')
      .eq('user_id', userId)
      .eq('friend_id', friendId)
      .eq('status', 'accepted')
      .single();

    if (error) 
        throw new CustomError('Failed to check friendship status', statusCodes.BAD_REQUEST);
    return data ? true : false;
  },

  // acceptFriendRequest(friendId) → update status to 'accepted'
  async acceptFriendRequest(friendId) {
    const { data, error } = await connect()
    .from(TABLE_NAME)
    .update({ status: 'accepted' })
    .eq('user_id', friendId)
    .eq('friend_id', userId)
    .eq('status', 'pending')
    .select();
    
    if (error) 
        throw new CustomError('Failed to accept friend request', statusCodes.BAD_REQUEST);
    return data[0];
    },

    // rejectFriendRequest(friendId) → remove from friends table
    async rejectFriendRequest(friendId) {
        const { error } = await connect()
        .from(TABLE_NAME)
        .delete()
        .eq('friend_id', friendId);
        
        if (error) 
            throw new CustomError('Failed to reject friend request', statusCodes.BAD_REQUEST);
        return { success: true };
    },

    // sendFriendRequest(friendId) → insert into friends table with status 'pending'
    async sendFriendRequest(friendId) {
        const { data, error } = await connect()
        .from(TABLE_NAME)
        .insert({ friend_id: friendId, status: 'pending' })
        .select();
        
        if (error) 
            throw new CustomError('Failed to send friend request', statusCodes.BAD_REQUEST);
        return data[0];
    },
};

module.exports = friendsModel;
