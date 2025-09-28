import express from "express";
import {
  registerUser,
  loginUser,
  getUserById,
  logoutUser,
} from "../controllers/userController.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/logout", logoutUser);
router.get("/:id", getUserById);

export default router;
