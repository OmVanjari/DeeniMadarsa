// controllers/course.controller.js
import Course from "../models/Course.js";
import { cloudinary } from "../config/cloudinary.js";


export const getAllCourses = async (req, res) => {
  try {
    const courses = await Course.find({ isActive: true }).sort({ order: 1, createdAt: -1 });
    res.status(200).json({
      success: true,
      count: courses.length,
      data: courses,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


export const getCourseById = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    if (!course) {
      return res.status(404).json({
        success: false,
        message: "Course not found",
      });
    }
    res.status(200).json({
      success: true,
      data: course,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


export const createCourse = async (req, res) => {
  try {
    const courseData = { ...req.body };

    // Duration object banao
    if (req.body["duration[value]"] || req.body["duration[unit]"]) {
      courseData.duration = {
        value: req.body["duration[value]"],
        unit: req.body["duration[unit]"],
      };
    }


    if (req.body["fees[amount]"] !== undefined) {
      courseData.fees = {
        amount: req.body["fees[amount]"],
        isFree: req.body["fees[isFree]"] === "true",
      };
    }

    // Image upload hui hai toh add karo
    if (req.file) {
      courseData.image = {
        url: req.file.path,
        public_id: req.file.filename,
      };
    }

    const course = new Course(courseData);
    await course.save();

    res.status(201).json({
      success: true,
      message: "Course created successfully ✅",
      data: course,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};


export const updateCourse = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    if (!course) {
      return res.status(404).json({
        success: false,
        message: "Course not found",
      });
    }

    const updateData = { ...req.body };


    if (req.body["duration[value]"] || req.body["duration[unit]"]) {
      updateData.duration = {
        value: req.body["duration[value]"],
        unit: req.body["duration[unit]"],
      };
    }

    // Fees object banao
    if (req.body["fees[amount]"] !== undefined) {
      updateData.fees = {
        amount: req.body["fees[amount]"],
        isFree: req.body["fees[isFree]"] === "true",
      };
    }

    // Nayi image aayi toh purani Cloudinary se delete karo
    if (req.file) {
      if (course.image?.public_id) {
        await cloudinary.uploader.destroy(course.image.public_id);
      }
      updateData.image = {
        url: req.file.path,
        public_id: req.file.filename,
      };
    }

    const updated = await Course.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true, runValidators: true }
    );

    res.status(200).json({
      success: true,
      message: "Course updated successfully ✅",
      data: updated,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// ── DELETE COURSE ────────────────────────────────────
export const deleteCourse = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    if (!course) {
      return res.status(404).json({
        success: false,
        message: "Course not found",
      });
    }

    // Cloudinary se image delete karo
    if (course.image?.public_id) {
      await cloudinary.uploader.destroy(course.image.public_id);
    }

    await Course.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: "Course deleted successfully ✅",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};