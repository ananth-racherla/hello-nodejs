/**
 * The service object represents the business layer.
 * @todo: Abstract mongo dependencies into a separate respository layer (repository pattern)
 */

import mongoose from 'mongoose'; 
import objectMapper from 'object-mapper';

const User = mongoose.model('User');

/**
 * Save user registration details
 */
export const register = async (userObj) => {
    const user = new User(userObj);
    await user.save();
}

/**
 * Returns a list of users
 */
export const getUserList = async (offset, limit) => {
    const users = await User.find({}).skip(offset).limit(limit);

    // Transform raw db object to a response entity
    // Probably not the most efficient way of doing this, but lends to better readability
    const map = {
        "[]._id": "[].id",
        "[].firstName": "[].firstName",
        "[].lastName": "[].lastName",
        "[].email": "[].email",
        "[].twitter": "[].twitter",
        "[].instagram": "[].instagram",
        "[].location": "[].location",
        "[].devEnvironment": "[].devEnvironment"
    };
    return objectMapper(users, map);
}
