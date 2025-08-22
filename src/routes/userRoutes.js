import express from "express";
import { authMiddleware } from "../middleware/authMiddleware.js";
import { getCurrentUser } from "../controllers/userController.js";

const router = express.Router();

// Route: Get current user
router.get("/me", authMiddleware, getCurrentUser);

export default router;
