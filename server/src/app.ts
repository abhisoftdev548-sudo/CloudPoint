import express from "express";
import cors from "cors";
import errorHandler from "./middlewares/errorHandler.js";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/api/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "CloudPilot API is running",
  });
});


app.use(errorHandler);

export default app;