import express from "express";
import { registerUser, loginUser, setupAdmin } from "../controllers/authController.js";

const router = express.Router();

// 🔹 Routes
router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/setup-admin", setupAdmin); // Temporary setup route

export default router;
