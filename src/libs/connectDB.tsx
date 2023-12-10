import mongoose from "mongoose";

export const connectDB = async () =>{
    try {
        const connect = await mongoose.connect(String(process.env.MONGODB_URI));
        console.log("Connected Successfully !");
    } catch (error) {
        console.log("Error while connecting with Database !");
    }
}

export default connectDB;