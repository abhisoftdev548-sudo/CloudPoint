import 'dotenv/config';
import express from "express";
import app from "./app.js";
import connectDB from "./configs/db.config.js";

const PORT = 5000;

app.listen(PORT, () => {
connectDB();
  console.log(`Server running on port ${PORT} \n\n        visit: http://localhost:${PORT} \n`);
});