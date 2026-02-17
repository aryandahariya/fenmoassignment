const mongoose = require("mongoose");

const DEFAULT_MONGO_URI = "mongodb://127.0.0.1:27017/expense_tracker";

const resolveMongoUri = () => {
  const uri = process.env.MONGO_URI ? process.env.MONGO_URI.trim() : "";

  if (uri) {
    return uri;
  }

  console.warn("MONGO_URI is missing in server/.env. Falling back to local MongoDB URL.");
  return DEFAULT_MONGO_URI;
};

const connectDB = async () => {
  const mongoUri = resolveMongoUri();

  try {
    const connection = await mongoose.connect(mongoUri, {
      serverSelectionTimeoutMS: 5000,
    });
    console.log(`MongoDB connected: ${connection.connection.host}`);
  } catch (error) {
    console.error(`MongoDB connection failed: ${error.message}`);
    if (!process.env.MONGO_URI) {
      console.error(
        "Create server/.env with MONGO_URI or start local MongoDB at mongodb://127.0.0.1:27017/expense_tracker"
      );
    }
    throw error;
  }
};

module.exports = connectDB;
