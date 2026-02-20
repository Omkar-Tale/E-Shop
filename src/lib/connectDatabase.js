import mongoose from "mongoose";

const MONGODB_URL = process.env.MONGODB_URI;

if (!MONGODB_URL) {
  console.error("Databse is not available!");
}

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = {
    conn: null,
    promise: null,
  };
}
export const connectDB = async () => {
  try {
    if (cached.conn) return cached.conn;
    if (!cached.promise) {
      cached.promise = mongoose.connect(MONGODB_URL, {
        dbName: "NextJS_eCommerce",
        bufferCommands: false,
      });
      cached.conn = await cached.promise;

      return cached.conn;
    }
  } catch (error) {
    console.error("MongoDB Connection Error", {
      message: error.message,
      stack: error.stack,
    });
}
};
