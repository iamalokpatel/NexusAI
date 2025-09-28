import express from "express";
import {
  createChat,
  getChatsByUser,
  updateChat,
  deleteChat,
} from "../controllers/chatController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", protect, createChat);
router.get("/", protect, getChatsByUser);
router.put("/:id", protect, updateChat);
router.delete("/:id", protect, deleteChat);

export default router;
