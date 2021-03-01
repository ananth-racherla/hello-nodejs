import mongoose from 'mongoose';
import encrypt  from 'mongoose-encryption';

const encryptionKey = process.env.SOME_32BYTE_BASE64_STRING;
const signingKey = process.env.SOME_64BYTE_BASE64_STRING;

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

/**
 * Ensure that the data at rest is encrypted.
 * Note: fields with indexes are not encrypted by default.
 * Mongo Enterprise has encryption at rest capabilities which are probably better to switch to.
 */
UserSchema.plugin(encrypt, { encryptionKey, signingKey });

export const User = mongoose.model('User', UserSchema);
export default User;
