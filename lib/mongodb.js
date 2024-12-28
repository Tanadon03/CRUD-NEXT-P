import mongoose from "mongoose";
import dotenv from "dotenv";

// Load environment variables
dotenv.config();

export const connectMongoDB = async () => {
    // console.log("MongoDB URI:", process.env.MONGODB_URI);

    try {
        // await mongoose.connect(process.env.MONGODB_URI);
        await mongoose.connect("mongodb+srv://admin:123@cluster0.zhp1d.mongodb.net/");
        console.log("Database Connected");
    } catch (error) {
        console.log("Error to Connect DB: ", error);
    }
};
