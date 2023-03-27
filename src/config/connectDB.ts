import mongoose from "mongoose";
const connectDB = mongoose.connect(process.env.MONGODB_URI!);
module.exports = connectDB;
