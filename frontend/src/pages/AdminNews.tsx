import { useEffect, useState } from "react";
import AdminLayout from "@/components/AdminLayout";
import { AnnouncementAPI } from "@/lib/api";

type AnnouncementItem = {
  _id: string;
  title: string;
  description: string;
  isActive: boolean;
};


const emptyAnnouncement: AnnouncementItem = {
  _id: "",
  title: "",
  description: "",
  isActive: true,
};

const AdminNews = () => {
  const [news, setNews] = useState<AnnouncementItem[]>([]);
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState<AnnouncementItem>(emptyAnnouncement);

  const load = async () => {
    try {
      const res = await AnnouncementAPI.getAdmin();
      setNews(Array.isArray(res.data?.data) ? res.data.data : []);
    } catch (err: any) {
      if (err.response?.status === 401) {
        try {
          const pubRes = await AnnouncementAPI.getPublic();
          setNews(Array.isArray(pubRes.data?.data) ? pubRes.data.data : []);
        } catch (pubErr) {
          console.error(pubErr);
        }
        return;
      }
      console.error(err);
    }
  };

  useEffect(() => {
    void load();
  }, []);

  const onSave = async (e: React.FormEvent) => {
    e.preventDefault();
    const isEdit = !!form._id;
    const payload = isEdit ? form : { title: form.title, description: form.description, isActive: form.isActive };

    try {
      if (isEdit) {
        await AnnouncementAPI.update(form._id, payload);
      } else {
        await AnnouncementAPI.create(payload);
      }
      setOpen(false);
      setForm(emptyAnnouncement);
      await load();
    } catch (err) {
      console.error(err);
    }
  };

  const onDelete = async (id: string) => {
    if(!window.confirm("Are you sure?")) return;
    try {
      await AnnouncementAPI.delete(id);
      await load();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <AdminLayout title="Announcements">
      <div className="mb-4 flex justify-start">
        <button onClick={() => { setForm(emptyAnnouncement); setOpen(true); }} className="rounded-xl bg-teal-700 px-4 py-2 text-sm font-semibold text-white hover:bg-teal-600">
          + Add Announcement
        </button>
      </div>

      <div className="grid grid-cols-1 gap-3 lg:grid-cols-2">
        {news.map((item) => (
          <div key={item._id} className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
            <div className="mb-2 flex items-center justify-between gap-3">
              <h3 className="text-base font-bold text-teal-900">{item.title}</h3>
              <span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${item.isActive ? "bg-amber-50 text-amber-700" : "bg-slate-100 text-slate-700"}`}>
                {item.isActive ? "Active" : "Inactive"}
              </span>
            </div>
            <p className="mb-2 text-sm text-slate-600 line-clamp-3">{item.description}</p>
            <div className="mt-3 flex gap-2">
              <button onClick={() => { setForm(item); setOpen(true); }} className="rounded-lg bg-amber-500 px-3 py-1.5 text-xs font-semibold text-white">Edit</button>
              <button onClick={() => onDelete(item._id)} className="rounded-lg bg-rose-600 px-3 py-1.5 text-xs font-semibold text-white">Delete</button>
            </div>
          </div>
        ))}
      </div>

      {open && (
        <div className="fixed inset-0 z-50 grid place-items-center bg-black/50 p-3">
          <div className="max-h-[90vh] w-full max-w-xl overflow-auto rounded-2xl bg-white p-4 sm:p-5">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-xl font-bold text-teal-900">{form._id ? "Edit Announcement" : "Add Announcement"}</h3>
              <button onClick={() => setOpen(false)} className="rounded-lg border px-2 py-1 text-sm">Close</button>
            </div>
            <form onSubmit={onSave} className="grid grid-cols-1 gap-3">
              <div>
                <label className="mb-1 block text-sm font-semibold text-slate-700">Title</label>
                <input className="w-full rounded-lg border p-2" placeholder="Announcement title" maxLength={200} value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} required />
              </div>
              <label className="flex items-center gap-2 rounded-lg border p-2 text-sm">
                <input type="checkbox" checked={form.isActive} onChange={(e) => setForm({ ...form, isActive: e.target.checked })} />
                Active Announcement
              </label>
              <div>
                <label className="mb-1 block text-sm font-semibold text-slate-700">Description</label>
                <textarea className="w-full rounded-lg border p-2" rows={5} placeholder="Announcement details..." value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} required />
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
