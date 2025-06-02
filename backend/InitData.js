import mongoose from "mongoose";
import dotenv from "dotenv";
import Message from "./models/messageModel.js";
import { expressQuestions } from "./dataCollection/expressQuestions.js";
import { generalQuestions } from "./dataCollection/generalQuestions.js";
import { mongoQuestions } from "./dataCollection/mongoQuestions.js";
import { nodeQuestions } from "./dataCollection/nodeQuestions.js";
import { reactQuestions } from "./dataCollection/reactQuestions.js";

dotenv.config();
async function initData() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to MongoDB");

    // await Message.deleteMany({});
    await Message.insertMany(mongoQuestions);
    console.log("Data inserted successfully");

    mongoose.disconnect();
  } catch (err) {
    console.error("Error inserting messages:", err);
  }
}

initData();
