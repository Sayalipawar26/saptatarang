// backend/routes/memberRoutes.js
import express from "express";
import { protect, admin } from "../middleware/authMiddleware.js";
import {
  addMember,
  getMembers,
  updateMember,
  deleteMember,
} from "../controllers/memberController.js";

const router = express.Router();

router.post("/", protect, admin, addMember);          // Add member
router.get("/", protect, admin, getMembers);          // List members
router.put("/:id", protect, admin, updateMember);     // Update member
router.delete("/:id", protect, admin, deleteMember);  // Delete member

export default router;
