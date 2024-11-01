import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const uri: string =
      process.env.MONGO_URI || "mongodb://localhost:27017/nexa-blog";
    await mongoose.connect(uri);
    console.log("MongoDB connected Successfully");
  } catch (error) {
    console.log("MongoDB connection failed", error);
    process.exit(1);
  }
};

export default connectDB;
