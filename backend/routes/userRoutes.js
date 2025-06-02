import express from "express";
import {
  registerUser,
  loginUser,
  getUserById,
  getUserProfile,
  logoutUser,
} from "../controllers/userController.js";

const router = express.Router();

// Sample route for user registration
router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/logout", logoutUser);
router.get("/profile", getUserProfile);
router.get("/:id", getUserById);

export default router;
