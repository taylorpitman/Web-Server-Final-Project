// models/postModel.js
const { updateLikes } = require('../controllers/postController');
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

  async getAllPosts() {
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

async updateLikes(id, increment) {
  console.log('Updating likes for post ID:', id, 'Increment:', increment);
  if (increment !== 1 && increment !== -1) {
    throw new CustomError('Invalid increment value', statusCodes.BAD_REQUEST);
  }

  const { data: currentPost, error: fetchError } = await connect()
    .from(TABLE_NAME)
    .select('likes')
    .eq('id', id)
    .single();

  if (fetchError) {
    console.error('Error fetching post for likes update:', fetchError);
    throw new CustomError('Failed to fetch post', statusCodes.NOT_FOUND);
  }

  const updatedLikes = currentPost.likes + increment;

  const { data, error } = await connect()
    .from(TABLE_NAME)
    .update({ likes: updatedLikes })
    .eq('id', id)
    .select();

  if (error) {
    console.error('Error updating likes:', error);
    throw new CustomError('Failed to update likes', statusCodes.BAD_REQUEST);
  }

  return data[0];
},

async getSubjectPost(postId) {
  const supabase = connect();

  // First get the subject_id from the post
  const { data: postData, error: postError } = await supabase
    .from('posts')
    .select('subject_id')
    .eq('id', postId)
    .single();

  if (postError || !postData) {
    console.error('Error fetching subject_id from post:', postError);
    throw new CustomError('Failed to fetch subject ID from post', statusCodes.BAD_REQUEST);
  }

  const subjectId = postData.subject_id;

  // Now get the subject details
  const { data: subjectData, error: subjectError } = await supabase
    .from('subjects')
    .select('*')
    .eq('id', subjectId)
    .single();

  if (subjectError || !subjectData) {
    console.error('Error fetching subject by ID:', subjectError);
    throw new CustomError('Failed to fetch subject data', statusCodes.BAD_REQUEST);
  }

  return subjectData;
},
 

  
};


module.exports = postModel;
