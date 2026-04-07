import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/fintrack';

const options: mongoose.ConnectOptions = {
  maxPoolSize: 10,     // re-use up to 10 connections in the pool
  minPoolSize: 2,      // keep at least 2 open
  socketTimeoutMS: 45000,
  serverSelectionTimeoutMS: 5000,
  connectTimeoutMS: 10000,
  family: 4,
  autoIndex: true,
};

let isConnected = false;
mongoose.set("debug", true);

export async function connectDB(): Promise<void> {
  if (isConnected) {
    console.log('MongoDB: already connected');
    return;
  }

  try {
    const conn = await mongoose.connect(MONGODB_URI, options);
    isConnected = true;
    console.log(`MongoDB: connected to ${conn.connection.name}`);
  } catch (err) {
    console.error('MongoDB connection error:', err);
    throw err;
  }
}

export async function disconnectDB(): Promise<void> {
  if (!isConnected) {
    return;
  }

  await mongoose.disconnect();
  isConnected = false;
  console.log('MongoDB: disconnected');
}

export default mongoose;