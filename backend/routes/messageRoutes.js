// routes/chatRoutes.js
import express from "express";
import { handleMessage } from "../controllers/messageController.js";

const router = express.Router();

router.post("/", handleMessage);

export default router;
