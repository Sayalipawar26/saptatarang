import express from "express";
import {
  addDocument,
  getDocuments,
  updateDocument,
  deleteDocument,
} from "../controllers/documentController.js";
import { protect, admin } from "../middleware/authMiddleware.js";
import { upload } from "../middleware/uploadMiddleware.js";

const router = express.Router();

// 🟢 Get all documents (Admin + Member)
router.get("/",  getDocuments);

// 🟠 Add new document (Admin only)
router.post("/",  admin, upload.single("file"), addDocument);

// ✏️ Update document (Admin only)
router.put("/:id", admin, upload.single("file"), updateDocument);

// ❌ Delete document (Admin only)
router.delete("/:id", admin, deleteDocument);

export default router;
