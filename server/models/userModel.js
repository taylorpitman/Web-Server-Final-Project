const { CustomError, statusCodes } = require('./errors')
const { connect } = require('./supabase')



const userModel = {

    //CREATE USER
    async createUser(userData) {
        const { data, error } = await connect()
            .from('users')
            .insert(userData);
        
        if (error) {
            throw new CustomError('Failed to create user', statusCodes.BAD_REQUEST);
        }
        return data;
    },

    async getUserById(userId) {
        const { data, error } = await connect()
            .from('users')
            .select('*')
            .eq('id', userId)
            .single();

        if (error) {
            throw new CustomError('User not found', statusCodes.NOT_FOUND);
        }
        return data;
    },

    async updateUser(userId, updatedData) {
        const { data, error } = await connect()
            .from('users')
            .update(updatedData)
            .eq('id', userId);

        if (error) {
            throw new CustomError('Failed to update user', statusCodes.BAD_REQUEST);
        }
        return data;
    },

    async deleteUser(userId) {
        const { data, error } = await connect()
            .from('users')
            .delete()
            .eq('id', userId);

        if (error) {
            throw new CustomError('Failed to delete user', statusCodes.BAD_REQUEST);
        }
        return data;
    }
};

module.exports = userModel;