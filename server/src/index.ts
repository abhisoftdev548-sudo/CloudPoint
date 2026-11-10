import 'dotenv/config';
import express from "express";
import app from "./app.js";
import connectDB from "./configs/dbConfig.js";
import { logger } from './utils/logger.js';
import ENV from './configs/envConfig.js';

const PORT = ENV.PORT || 5000;

app.listen(PORT, () => {
connectDB();
  logger.success(`Server running on port ${PORT} \n\n        visit: http://localhost:${PORT} \n`);
});