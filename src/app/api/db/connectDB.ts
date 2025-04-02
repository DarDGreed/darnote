import mongoose from 'mongoose';

export const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI as string);
    console.log(`Mongoose connected: ${conn.connection.host}`);
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.log('Connection Error:', error.message);
      console.error(error.stack);
    } else {
      console.log('Unknown error occurred during connection.');
    }
    process.exit(1);
  }
};

export default connectDB;
