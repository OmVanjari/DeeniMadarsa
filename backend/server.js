import express from "express";
import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

const app = express();
const PORT = process.env.PORT || 5000;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DATA_FILE = path.join(__dirname, "data.json");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  if (req.method === "OPTIONS") {
    res.sendStatus(204);
    return;
  }
  next();
});

const seedData = {
  courses: [
    {
      id: "69e221a65176d5ee877be6ba",
      name: "Hifz ul Quran",
      description: "Yeh course Quran hifz ke liye hai",
      level: "Beginners",
      category: "Hifz",
      totalStudents: 50,
      isActive: true,
      order: 0,
      duration: { value: 3, unit: "Years" },
      image: { url: "", public_id: "" },
      fees: { amount: 0, isFree: true }
    }
  ],
  news: [
    {
      id: "news-1",
      title: "New Admissions Open for 2026-27 Academic Year",
      date: "2026-04-18",
      status: "Pinned",
      category: "Admission",
      isActive: true,
      order: 0,
      summary: "Applications are open for Hifz, Nazra and Class 1-8. Limited seats, apply early."
    }
  ],
  users: [
    {
      id: "user-1",
      name: "Admin User",
      role: "Administrator",
      email: "admin@madarsa.local",
      status: "Active"
    },
    {
      id: "user-2",
      name: "Course Manager",
      role: "Manager",
      email: "manager@madarsa.local",
      status: "Active"
    },
    {
      id: "user-3",
      name: "Content Editor",
      role: "Editor",
      email: "editor@madarsa.local",
      status: "Active"
    }
  ]
};

function clone(value) {
  return JSON.parse(JSON.stringify(value));
}

function asNumber(value, fallback = 0) {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : fallback;
}

function normalizeCourse(course = {}, index = 0) {
  return {
    id: String(course.id || course._id || `course-${Date.now()}-${index}`),
    name: String(course.name || course.title || ""),
    description: String(course.description || ""),
    level: String(course.level || ""),
    category: String(course.category || ""),
    totalStudents: asNumber(course.totalStudents ?? course.students, 0),
    isActive: course.isActive !== undefined ? Boolean(course.isActive) : true,
    order: asNumber(course.order, index),
    duration: {
      value: asNumber(course?.duration?.value ?? course.durationValue, 0),
      unit: String(course?.duration?.unit ?? course.durationUnit ?? "Years")
    },
    image: {
      url: String(course?.image?.url || course.imageUrl || ""),
      public_id: String(course?.image?.public_id || course.imagePublicId || "")
    },
    fees: {
      amount: asNumber(course?.fees?.amount ?? course.feesAmount, 0),
      isFree: course?.fees?.isFree !== undefined ? Boolean(course.fees.isFree) : Boolean(course.isFree)
    }
  };
}

function normalizeNews(news = {}, index = 0) {
  return {
    id: String(news.id || `news-${Date.now()}-${index}`),
    title: String(news.title || ""),
    date: String(news.date || ""),
    status: String(news.status || ""),
    category: String(news.category || "General"),
    isActive: news.isActive !== undefined ? Boolean(news.isActive) : true,
    order: asNumber(news.order, index),
    summary: String(news.summary || "")
  };
}

async function loadStore() {
  try {
    const raw = await fs.readFile(DATA_FILE, "utf8");
    const parsed = JSON.parse(raw);
    return {
      courses: Array.isArray(parsed.courses) ? parsed.courses.map((item, index) => normalizeCourse(item, index)) : clone(seedData.courses),
      news: Array.isArray(parsed.news) ? parsed.news.map((item, index) => normalizeNews(item, index)) : clone(seedData.news),
      users: Array.isArray(parsed.users) ? parsed.users : clone(seedData.users)
    };
  } catch {
    await saveStore(seedData);
    return clone(seedData);
  }
}

async function saveStore(store) {
  await fs.writeFile(DATA_FILE, JSON.stringify(store, null, 2), "utf8");
}

function durationText(course) {
  return `${course.duration?.value ?? 0} ${course.duration?.unit ?? "Years"}`.trim();
}

function mapCourseResponse(course, index = 0) {
  const item = normalizeCourse(course, index);
  return {
    ...item,
    durationText: durationText(item),
    _id: item.id,
    title: item.name,
    students: item.totalStudents
  };
}

app.get("/", (_req, res) => {
  res.json({ message: "Backend API is running", endpoints: ["/api/courses", "/api/news", "/api/users"] });
});

app.get("/api/courses", async (_req, res) => {
  const store = await loadStore();
  res.json({ data: store.courses.map(mapCourseResponse) });
});

app.get("/api/news", async (_req, res) => {
  const store = await loadStore();
  res.json({ data: store.news });
});

app.get("/api/users", async (_req, res) => {
  const store = await loadStore();
  res.json({ data: store.users });
});

app.post("/api/courses/save", async (req, res) => {
  const store = await loadStore();
  const payload = normalizeCourse(req.body, 0);
  const index = store.courses.findIndex((item) => item.id === payload.id);
  if (index >= 0) {
    store.courses[index] = payload;
  } else {
    store.courses.unshift(payload);
  }
  await saveStore(store);
  res.json({ success: true, data: mapCourseResponse(payload) });
});

app.post("/api/courses/delete", async (req, res) => {
  const id = String(req.body?.id || "");
  const store = await loadStore();
  store.courses = store.courses.filter((item) => item.id !== id);
  await saveStore(store);
  res.json({ success: true });
});

app.post("/api/news/save", async (req, res) => {
  const store = await loadStore();
  const payload = normalizeNews(req.body, 0);
  const index = store.news.findIndex((item) => item.id === payload.id);
  if (index >= 0) {
    store.news[index] = payload;
  } else {
    store.news.unshift(payload);
  }
  await saveStore(store);
  res.json({ success: true, data: payload });
});

app.post("/api/news/delete", async (req, res) => {
  const id = String(req.body?.id || "");
  const store = await loadStore();
  store.news = store.news.filter((item) => item.id !== id);
  await saveStore(store);
  res.json({ success: true });
});

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});
