import Announcement from "../models/Announcement.js";

// @desc    Get all active announcements
// @route   GET /api/announcements
// @access  Public
export const getAnnouncements = async (req, res) => {
  try {
    const announcements = await Announcement.find({ isActive: true }).sort({ createdAt: -1 });
    res.status(200).json({ success: true, count: announcements.length, data: announcements });
  } catch (error) {
    console.error("Error fetching announcements:", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

// @desc    Get all announcements (including inactive)
// @route   GET /api/announcements/admin
// @access  Private/Admin
export const getAdminAnnouncements = async (req, res) => {
  try {
    const announcements = await Announcement.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, count: announcements.length, data: announcements });
  } catch (error) {
    console.error("Error fetching admin announcements:", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

// @desc    Create an announcement
// @route   POST /api/announcements
// @access  Private/Admin
export const createAnnouncement = async (req, res) => {
  try {
    const { title, description, isActive } = req.body;
    
    if (!title || !description) {
      return res.status(400).json({ success: false, message: "Please provide title and description" });
    }

    const announcement = await Announcement.create({
      title,
      description,
      isActive: isActive !== undefined ? isActive : true,
    });

    res.status(201).json({ success: true, data: announcement });
  } catch (error) {
    console.error("Error creating announcement:", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

// @desc    Update an announcement
// @route   PUT /api/announcements/:id
// @access  Private/Admin
export const updateAnnouncement = async (req, res) => {
  try {
    let announcement = await Announcement.findById(req.params.id);

    if (!announcement) {
      return res.status(404).json({ success: false, message: "Announcement not found" });
    }

    announcement = await Announcement.findByIdAndUpdate(req.params.id, req.body, {
      returnDocument: "after",
      runValidators: true,
    });

    res.status(200).json({ success: true, data: announcement });
  } catch (error) {
    console.error("Error updating announcement:", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

// @desc    Delete an announcement
// @route   DELETE /api/announcements/:id
// @access  Private/Admin
export const deleteAnnouncement = async (req, res) => {
  try {
    const announcement = await Announcement.findById(req.params.id);

    if (!announcement) {
      return res.status(404).json({ success: false, message: "Announcement not found" });
    }

    await announcement.deleteOne();

    res.status(200).json({ success: true, message: "Announcement deleted successfully" });
  } catch (error) {
    console.error("Error deleting announcement:", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};
