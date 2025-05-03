// models/postModel.js
const { CustomError, statusCodes } = require('./errors');
const { connect } = require('./supabase');

const TABLE_NAME = 'posts';

const postModel = {
  async createPost(postData) {
    const { data, error } = await connect().from(TABLE_NAME).insert(postData).select();
    if (error) {
      console.error('Error creating post:', error);
      throw new CustomError('Failed to create post', statusCodes.BAD_REQUEST);
    }    
    
    return data[0];
  },

  async getAllPost() {
    const { data, error } = await connect().from(TABLE_NAME).select('*');
    if (error) throw new CustomError('Failed to fetch post', statusCodes.BAD_REQUEST);
    return data;
  },

  async getPostById(id) {
    const { data, error } = await connect().from(TABLE_NAME).select('*').eq('id', id).single();
    if (error) throw new CustomError('Post not found', statusCodes.NOT_FOUND);
    return data;
  },

  async updatePost(id, updatedData) {
    const { data, error } = await connect().from(TABLE_NAME).update(updatedData).eq('id', id).select();
    if (error) throw new CustomError('Failed to update post', statusCodes.BAD_REQUEST);
    return data[0];
  },

  async deletePost(id) {
    const { error } = await connect()
        .from(TABLE_NAME)
        .delete()
        .eq('id', id);

    if (error) 
        throw new CustomError('Failed to delete post', statusCodes.BAD_REQUEST);
    return { success: true };
  },

//getPostsByUser(userId) → for "my posts" view
  async getPostsByUser (userId) {
    const { data, error } = await connect()
        .from(TABLE_NAME)
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: false });

    if (error) throw new CustomError('Failed to fetch posts for this user', statusCodes.BAD_REQUEST);
    return data;
  },

//getRecentPosts(limit = 10) → for timeline
    async getRecentPosts (limit = 10) {
        const { data, error } = await connect()
            .from(TABLE_NAME)
            .select('*')
            .order('created_at', { ascending: false })
            .limit(limit);
    
        if (error) throw new CustomError('Failed to fetch recent posts', statusCodes.BAD_REQUEST);
        return data;
    },
};


module.exports = postModel;
