import express from "express";
import {
  handleMessage,
  getMessagesByChat,
} from "../controllers/messageController.js";

const router = express.Router();

// POST - send message with chatId and question
router.post("/", handleMessage);

// GET - get messages for a specific chat
router.get("/:chatId", getMessagesByChat);

export default router;
