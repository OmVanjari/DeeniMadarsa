import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AdminLayout from "@/components/AdminLayout";

type CountData = {
  courses: number;
  news: number;
  users: number;
};

type CourseItem = {
  id: string;
  name: string;
  category: string;
  level: string;
  duration?: { value?: number; unit?: string };
};

type NewsItem = {
  id: string;
  title: string;
  status: string;
  date: string;
  isActive?: boolean;
};

const API = "http://localhost:5000";

const AdminDashboard = () => {
  const minVisibleRows = 3;
  const [counts, setCounts] = useState<CountData>({ courses: 0, news: 0, users: 0 });
  const [recentCourses, setRecentCourses] = useState<CourseItem[]>([]);
  const [activeNews, setActiveNews] = useState<NewsItem[]>([]);

  useEffect(() => {
    const load = async () => {
      const [cRes, nRes, uRes] = await Promise.all([
        fetch(`${API}/api/courses`),
        fetch(`${API}/api/news`),
        fetch(`${API}/api/users`),
      ]);
      const cJson = await cRes.json();
      const nJson = await nRes.json();
      const uJson = await uRes.json();

      const courses: CourseItem[] = Array.isArray(cJson?.data) ? cJson.data : [];
      const news: NewsItem[] = Array.isArray(nJson?.data) ? nJson.data : [];

      setCounts({
        courses: courses.length,
        news: news.length,
        users: Array.isArray(uJson?.data) ? uJson.data.length : 0,
      });

      setRecentCourses(courses.slice(0, 5));
      setActiveNews(news.filter((item) => item.isActive !== false).slice(0, 5));
    };
    void load();
  }, []);

  return (
    <AdminLayout title="Dashboard">
      <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2 sm:gap-3 lg:grid-cols-3">
        <div className="rounded-xl border border-teal-100 bg-teal-50 p-3 sm:p-4">
          <p className="text-sm text-teal-700">Courses</p>
          <p className="text-2xl font-bold text-teal-900 sm:text-3xl">{counts.courses}</p>
        </div>
        <div className="rounded-xl border border-amber-100 bg-amber-50 p-3 sm:p-4">
          <p className="text-sm text-amber-700">Announcements</p>
          <p className="text-2xl font-bold text-amber-900 sm:text-3xl">{counts.news}</p>
        </div>
        <div className="rounded-xl border border-emerald-100 bg-emerald-50 p-3 sm:p-4">
          <p className="text-sm text-emerald-700">Users</p>
          <p className="text-2xl font-bold text-emerald-900 sm:text-3xl">{counts.users}</p>
        </div>
      </div>

      <div className="mt-3 grid grid-cols-1 items-start gap-2.5 sm:mt-4 sm:gap-3 lg:grid-cols-2">
        <section className="rounded-xl border border-slate-200 bg-white p-3 sm:p-4">
          <div className="mb-2 flex items-center justify-between">
            <h3 className="text-sm font-bold text-teal-900 sm:text-base">Recently Added Courses</h3>
            <span className="rounded-full bg-teal-50 px-2 py-1 text-xs font-semibold text-teal-700">Latest</span>
          </div>

          {recentCourses.length === 0 ? (
            <p className="text-sm text-slate-500">No course added yet.</p>
          ) : (
            <div className="space-y-2">
              {recentCourses.map((course) => (
                <Link key={course.id} to="/admin/courses" className="block rounded-lg border border-slate-100 bg-slate-50 p-2.5 transition hover:border-teal-200 hover:bg-teal-50">
                  <p className="text-sm font-semibold text-slate-800">{course.name}</p>
                  <p className="text-xs text-slate-500">{course.category} • {course.level}</p>
                  <p className="text-xs text-slate-500">
                    Duration: {course.duration?.value ?? "-"} {course.duration?.unit ?? ""}
                  </p>
                  <p className="mt-1 text-[11px] font-semibold text-teal-700">Open Courses page</p>
                </Link>
              ))}
              {Array.from({ length: Math.max(0, minVisibleRows - recentCourses.length) }).map((_, index) => (
                <article key={`course-placeholder-${index}`} className="rounded-lg border border-dashed border-slate-200 bg-slate-50/60 p-2.5">
                  <p className="text-sm font-semibold text-slate-400">No more courses</p>
                  <p className="text-xs text-slate-400">Add a new course to show here.</p>
                </article>
              ))}
            </div>
          )}
        </section>

        <section className="rounded-xl border border-slate-200 bg-white p-3 sm:p-4">
          <div className="mb-2 flex items-center justify-between">
            <h3 className="text-sm font-bold text-teal-900 sm:text-base">Active Announcements</h3>
            <span className="rounded-full bg-amber-50 px-2 py-1 text-xs font-semibold text-amber-700">Active</span>
          </div>

          {activeNews.length === 0 ? (
            <p className="text-sm text-slate-500">No active announcement found.</p>
          ) : (
            <div className="space-y-2">
              {activeNews.map((news) => (
                <Link key={news.id} to="/admin/news" className="block rounded-lg border border-slate-100 bg-slate-50 p-2.5 transition hover:border-amber-200 hover:bg-amber-50">
                  <p className="text-sm font-semibold text-slate-800">{news.title}</p>
                  <p className="text-xs text-slate-500">{news.status} • {news.date}</p>
                  <p className="mt-1 text-[11px] font-semibold text-amber-700">Open Announcements page</p>
                </Link>
              ))}
              {Array.from({ length: Math.max(0, minVisibleRows - activeNews.length) }).map((_, index) => (
                <article key={`news-placeholder-${index}`} className="rounded-lg border border-dashed border-slate-200 bg-slate-50/60 p-2.5">
                  <p className="text-sm font-semibold text-slate-400">No more announcements</p>
                  <p className="text-xs text-slate-400">Add a new announcement to show here.</p>
                </article>
              ))}
            </div>
          )}
        </section>
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;
