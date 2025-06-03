// routes/chat.js
import express from "express";
import {
  createChat,
  getChatsByUser,
  updateChat,
  deleteChat,
} from "../controllers/chatController.js";

const router = express.Router();

// Create new chat
router.post("/", createChat);

// Get all chats for a user (userId sent as query param)
router.get("/", getChatsByUser);

// Update chat by id
router.put("/:id", updateChat);

// Delete chat by id
router.delete("/:id", deleteChat);

export default router;
