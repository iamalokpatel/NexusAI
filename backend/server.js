import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import chatRoutes from "./routes/chatRoutes.js";
import userRoutes from "./routes/userRoutes.js";

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/chats", chatRoutes);
app.use("/api/users", userRoutes);

mongoose
  .connect(process.env.MONGO_URI)
  .then(
    () => console.log("Database Connected"),
    app.listen(5000, () => console.log("Server running on port 5000"))
  )
  .catch((err) => console.error("MongoDB connection error:", err));
