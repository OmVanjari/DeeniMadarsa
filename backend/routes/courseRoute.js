// routes/courseRoute.js
import express from "express";
import {
  getAllCourses,
  getCourseById,
  createCourse,
  updateCourse,
  deleteCourse,
} from "../controllers/courseControllers.js";
import { upload } from "../config/cloudinary.js";
import { protectAdmin } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", getAllCourses);                          // Frontend
router.get("/all", getAllCourses);                       // Admin
router.get("/:id", getCourseById);                      // Single
router.post("/", protectAdmin, upload.single("image"), createCourse); // Add
router.put("/:id", protectAdmin, upload.single("image"), updateCourse); // Update
router.delete("/:id", protectAdmin, deleteCourse);                    // Delete

export default router;