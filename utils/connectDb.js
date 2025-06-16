import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

let isConnected = false;

const connectDb = async () => {
  if (isConnected) {
    console.log("✅ Already connected to DB.");
    return;
  }

  try {
    await mongoose.connect(process.env.MONGODB_URI);

    isConnected = true;
    console.log("🚀 Db connected.....");
  } catch (error) {
    console.error("❌ DbError:", error.message);
    process.exit(1); // optionally kill the process if db fails
  }
};

export default connectDb;
