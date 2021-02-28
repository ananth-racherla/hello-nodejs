import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: [true, 'First name is required']
    },

    lastName: {
        type: String,
        required: [true, 'First name is required']
    },

    email: {
        type: String,
        required: [true, 'Email address is required'],
        lowercase: true
    },

    twitter: String,
    instagram: String,
    location: String,
    devEnvironment: String
},
    { timestamps: true },
);

const User = mongoose.model('User', UserSchema);
export default User;
