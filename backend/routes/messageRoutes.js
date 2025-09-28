import express from "express";
import {
  handleMessage,
  getMessagesByChat,
} from "../controllers/messageController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", protect, handleMessage);
router.get("/:chatId", protect, getMessagesByChat);

export default router;
