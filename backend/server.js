// server.js
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import courseRoutes from "./routes/courseRoute.js";
import announcementRoutes from "./routes/announcementRoute.js";
import adminRoutes from "./routes/adminRoute.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// ── MIDDLEWARE ───────────────────────────────────────
app.use(cors({
  origin: "*",
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ── DB CONNECT ───────────────────────────────────────
connectDB();

// ── ROUTES ───────────────────────────────────────────
app.get("/", (req, res) => {
  res.json({
    message: "Backend API is running ✅",
    endpoints: ["/api/courses", "/api/announcements"],
  });
});

app.use("/api/courses", courseRoutes);
app.use("/api/announcements", announcementRoutes);
app.use("/api/admin", adminRoutes);

// ── 404 HANDLER ─────────────────────────────────────
app.use((req, res, next) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
  });
});

// ── ERROR HANDLER ───────────────────────────────────
app.use((err, req, res, next) => {
  console.error("Server Error:", err.message || err);
  
  // Handle multer Request aborted error without crashing server
  if (err.code === 'ECONNABORTED' || err.message === 'Request aborted') {
    return res.status(400).json({ success: false, message: "Request aborted by client" });
  }

  res.status(500).json({
    success: false,
    message: err.message || "Internal Server Error",
  });
});

// ── LISTEN ───────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT} 🚀`);
});