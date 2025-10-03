import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const uri: string = process.env.MONGO_URI || "";

    const options = {
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
    };

    await mongoose.connect(uri, options);
    console.log("✅ MongoDB connected Successfully");
  } catch (error) {
    console.error("❌ MongoDB connection failed:", error);
    console.log("Retrying connection in 5 seconds...");

    setTimeout(connectDB, 5000);
  }
};

export default connectDB;
