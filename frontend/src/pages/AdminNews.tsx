import { useEffect, useState } from "react";
import AdminLayout from "@/components/AdminLayout";

type NewsItem = {
  id: string;
  title: string;
  date: string;
  status: string;
  category: string;
  isActive: boolean;
  order: number;
  summary: string;
};

const API = "http://localhost:5000";
const statusOptions = ["Pinned", "Notice", "Event", "Update"];
const categoryOptions = ["General", "Admission", "Exam", "Holiday", "Event"];

const emptyNews: NewsItem = {
  id: "",
  title: "",
  date: "",
  status: "Notice",
  category: "General",
  isActive: true,
  order: 0,
  summary: "",
};

const AdminNews = () => {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState<NewsItem>(emptyNews);

  const load = async () => {
    const res = await fetch(`${API}/api/news`);
    const json = await res.json();
    setNews(Array.isArray(json?.data) ? json.data : []);
  };

  useEffect(() => {
    void load();
  }, []);

  const onSave = async (e: React.FormEvent) => {
    e.preventDefault();
    const payload = { ...form, id: form.id || `news-${Date.now()}` };
    await fetch(`${API}/api/news/save`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    setOpen(false);
    setForm(emptyNews);
    await load();
  };

  const onDelete = async (id: string) => {
    await fetch(`${API}/api/news/delete`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    await load();
  };

  return (
    <AdminLayout title="Announcements">
      <div className="mb-4 flex justify-start">
        <button onClick={() => { setForm(emptyNews); setOpen(true); }} className="rounded-xl bg-teal-700 px-4 py-2 text-sm font-semibold text-white hover:bg-teal-600">
          + Add Announcement
        </button>
      </div>

      <div className="grid grid-cols-1 gap-3 lg:grid-cols-2">
        {news.map((item) => (
          <div key={item.id} className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
            <div className="mb-2 flex items-center justify-between gap-3">
              <h3 className="text-base font-bold text-teal-900">{item.title}</h3>
              <span className="rounded-full bg-amber-50 px-2.5 py-1 text-xs font-semibold text-amber-700">{item.status}</span>
            </div>
            <p className="mb-2 text-sm text-slate-600">{item.summary}</p>
            <p className="text-xs text-slate-500">Date: {item.date}</p>
            <p className="text-xs text-slate-500">Category: {item.category || "General"}</p>
            <p className="text-xs text-slate-500">Display Order: {item.order ?? 0} (0 means first)</p>
            <p className="text-xs text-slate-500">Active: {item.isActive ? "Yes" : "No"}</p>
            <div className="mt-3 flex gap-2">
              <button onClick={() => { setForm(item); setOpen(true); }} className="rounded-lg bg-amber-500 px-3 py-1.5 text-xs font-semibold text-white">Edit</button>
              <button onClick={() => onDelete(item.id)} className="rounded-lg bg-rose-600 px-3 py-1.5 text-xs font-semibold text-white">Delete</button>
            </div>
          </div>
        ))}
      </div>

      {open && (
        <div className="fixed inset-0 z-50 grid place-items-center bg-black/50 p-3">
          <div className="max-h-[90vh] w-full max-w-xl overflow-auto rounded-2xl bg-white p-4 sm:p-5">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-xl font-bold text-teal-900">{form.id ? "Edit Announcement" : "Add Announcement"}</h3>
              <button onClick={() => setOpen(false)} className="rounded-lg border px-2 py-1 text-sm">Close</button>
            </div>
            <form onSubmit={onSave} className="grid grid-cols-1 gap-3">
              <div>
                <label className="mb-1 block text-sm font-semibold text-slate-700">Announcement ID</label>
                <input className="w-full rounded-lg border p-2" placeholder="Auto if empty" value={form.id} onChange={(e) => setForm({ ...form, id: e.target.value })} />
              </div>
              <div>
                <label className="mb-1 block text-sm font-semibold text-slate-700">Title</label>
                <input className="w-full rounded-lg border p-2" placeholder="Announcement title" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} required />
              </div>
              <div>
                <label className="mb-1 block text-sm font-semibold text-slate-700">Date</label>
                <input className="w-full rounded-lg border p-2" type="date" value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} required />
              </div>
              <div>
                <label className="mb-1 block text-sm font-semibold text-slate-700">Status</label>
                <select className="w-full rounded-lg border p-2" value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value })} required>
                  {statusOptions.map((status) => (
                    <option key={status} value={status}>
                      {status}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="mb-1 block text-sm font-semibold text-slate-700">Category</label>
                <select className="w-full rounded-lg border p-2" value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} required>
                  {categoryOptions.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="mb-1 block text-sm font-semibold text-slate-700">Display Order</label>
                <input className="w-full rounded-lg border p-2" type="number" placeholder="0, 1, 2..." value={form.order} onChange={(e) => setForm({ ...form, order: Number(e.target.value) })} />
                <p className="mt-1 text-xs text-slate-500">Use 0 for first, 1 for second, 2 for third.</p>
              </div>
              <label className="flex items-center gap-2 rounded-lg border p-2 text-sm">
                <input type="checkbox" checked={form.isActive} onChange={(e) => setForm({ ...form, isActive: e.target.checked })} />
                Active Announcement
              </label>
              <div>
                <label className="mb-1 block text-sm font-semibold text-slate-700">Summary</label>
                <textarea className="w-full rounded-lg border p-2" rows={4} placeholder="Announcement details..." value={form.summary} onChange={(e) => setForm({ ...form, summary: e.target.value })} required />
              </div>
              <div className="flex justify-end">
                <button type="submit" className="rounded-xl bg-teal-700 px-4 py-2 text-sm font-semibold text-white">Save</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </AdminLayout>
  );
};

export default AdminNews;
