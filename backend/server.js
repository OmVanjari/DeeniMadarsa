import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import courseRoutes from "./routes/courseRoute.js";
import adminRoutes from "./routes/adminRoute.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// ── MIDDLEWARE ───────────────────────────────────────
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ── DB CONNECT ───────────────────────────────────────
connectDB();

// ── ROUTES ───────────────────────────────────────────
app.get("/", (req, res) => {
  res.send("Api is running ✅");
});

app.use("/api/courses", courseRoutes);
app.use("/api/admin", adminRoutes);

// ── LISTEN ───────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT} 🚀`);
}); 