import mongoose from 'mongoose'

const MONGODB_URI = process.env.MONGODB_URI!;

if(!MONGODB_URI) {
  throw new Error('DB connection string not found.');
}

let cachedConnection = global.mongoose;

if(!cachedConnection) {
  cachedConnection = global.mongoose = { con: null, promise: null }
}

export async function connectToDB() {
  if(cachedConnection.con) {
    return cachedConnection.con;
  }

  if(!cachedConnection.promise) {
    const options = {
      bufferCommands: true,
      maxPoolSize: 10
    }

    cachedConnection.promise = mongoose.connect(MONGODB_URI, options)
      .then((mongoose) => {
        console.log('Connected to DB successfully');
        return mongoose.connection;
      })
      .catch((error) => {
        console.error('DB connection error:', error);
        throw error;
      });
  }

  try {
    cachedConnection.con = await cachedConnection.promise;
  } catch(error) {
    cachedConnection.promise = null;
    console.error('Failed to connect to DB. E:', error);
    throw error;
  }

  return cachedConnection.con;
}