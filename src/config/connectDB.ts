import mongoose from "mongoose";

const connectDB = () => {
    return mongoose.connect(process.env.SERVICE_APP_MONGODB_URI!)
        .then(() => {
            console.log("Connected to MongoDB");
        })
        .catch((error) => {
            console.log("Error connecting to MongoDB", error);
        });
};

export default connectDB;
