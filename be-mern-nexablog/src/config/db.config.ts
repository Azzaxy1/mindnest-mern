import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const uri: string =
      process.env.MONGO_URI || "mongodb://localhost:27017/mindnest";

    // Opsi koneksi untuk menangani masalah koneksi
    const options = {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 5000, // Timeout setelah 5 detik
      socketTimeoutMS: 45000, // Timeout socket setelah 45 detik
    };

    await mongoose.connect(uri, options);
    console.log("MongoDB connected Successfully");
  } catch (error) {
    console.log("MongoDB connection failed", error);
    console.log("Retrying connection in 5 seconds...");

    // Retry koneksi setelah 5 detik
    setTimeout(() => {
      connectDB();
    }, 5000);
  }
};

export default connectDB;
