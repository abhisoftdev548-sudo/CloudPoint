import mongoose from "mongoose";
import { logger } from "../utils/logger.js";
import ENV from "./envConfig.js";

const connectDB = async () => {
    try{
        await mongoose.connect(ENV.MONGO_URI!);
        logger.success("MongoDB connected Successfully");
    }catch(err){
        logger.error("MongoDB Error --> " + err);
    }
}

export default connectDB;