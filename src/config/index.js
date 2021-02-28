import dotenv from 'dotenv';

dotenv.config();

// Assume running in development mode by default
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

export default {
  // Main application port
  port: parseInt(process.env.PORT, 10) || 3000,

  // Mongo db connection string
  databaseURL: process.env.MONGODB_URI,

  // Log config
  logs: {
    level: process.env.LOG_LEVEL || 'info'
  },
};
