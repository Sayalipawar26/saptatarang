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

router.post("/",  admin, addMember);          // Add member
router.get("/",  admin, getMembers);          // List members
router.put("/:id",  admin, updateMember);     // Update member
router.delete("/:id", admin, deleteMember);  // Delete member

export default router;
