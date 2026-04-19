import express from "express";
import {
  getAnnouncements,
  getAdminAnnouncements,
  createAnnouncement,
  updateAnnouncement,
  deleteAnnouncement,
} from "../controllers/announcementControllers.js";
import { protectAdmin } from "../middleware/authMiddleware.js";

const router = express.Router();

// Public routes
router.get("/", getAnnouncements);

// Protected Admin routes
router.get("/admin", protectAdmin, getAdminAnnouncements);
router.post("/", protectAdmin, createAnnouncement);
router.put("/:id", protectAdmin, updateAnnouncement);
router.delete("/:id", protectAdmin, deleteAnnouncement);

export default router;
