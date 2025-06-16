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

    cachedConnection.promise = mongoose.connect(MONGODB_URI, options).then(() => mongoose.connection);
  }

  try {
    cachedConnection.con = await cachedConnection.promise;
  } catch(error) {
    cachedConnection.promise = null;
  }

  return cachedConnection.con;
}

// async function connectDB() {
//   if (connection.isConnected) {
//     console.log('Using existing connection')
//     return;
//   }

//   try {
//     const db = await mongoose.connect(process.env.MONGODB_URI as string);

//     connection.isConnected = db.connections[0].readyState === 1;
//     console.log('Connected to the database successfully');
//   } catch (error) {
//     console.log('Error while connecting to the database E:', error);
//     process.exit(1);
//   }
// }

// export { connectDB };