import mongoose from 'mongoose';
import config from '../config/index.js';
import '../models/user.js';

export default async () => {
    const { connection: { db } = {} } = await mongoose.connect(config.databaseURL, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true
    });

    return db;
};
