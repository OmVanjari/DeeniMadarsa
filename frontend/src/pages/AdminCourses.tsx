import { useEffect, useState } from "react";
import AdminLayout from "@/components/AdminLayout";
import { CourseAPI } from "@/lib/api";

type Course = {
  _id?: string;
  id?: string;
  name: string;
  category: string;
  level: string;
  description: string;
  totalStudents: number;
  duration: { value: number; unit: string };
  fees: { amount: number; isFree: boolean };
  image: { url: string; public_id: string };
  isActive: boolean;
  order: number;
};

const levelOptions = ["Beginners", "Intermediate", "Advanced", "All Ages"];

const emptyCourse: Course = {
  name: "",
  category: "",
  level: "Beginners",
  description: "",
  totalStudents: 0,
  duration: { value: 1, unit: "Years" },
  fees: { amount: 0, isFree: true },
  image: { url: "", public_id: "" },
  isActive: true,
  order: 0,
};

const AdminCourses = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState<Course>(emptyCourse);

  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const onImageFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    
    setSelectedFile(file);

    const reader = new FileReader();
    reader.onload = () => {
      const result = typeof reader.result === "string" ? reader.result : "";
      setForm((prev) => ({
        ...prev,
        image: {
          url: result,
          public_id: file.name,
        },
      }));
    };
    reader.readAsDataURL(file);
  };

  const load = async () => {
    try {
      const res = await CourseAPI.getAllAdmin();
      setCourses(Array.isArray(res.data?.data) ? res.data.data : []);
    } catch (error) {
      console.error("Error loading courses:", error);
    }
  };

  useEffect(() => {
    void load();
  }, []);

  const onSave = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", form.name);
    formData.append("category", form.category);
    formData.append("level", form.level);
    formData.append("description", form.description);
    formData.append("totalStudents", String(form.totalStudents));
    formData.append("duration[value]", String(form.duration.value));
    formData.append("duration[unit]", form.duration.unit);
    formData.append("fees[amount]", String(form.fees.amount));
    formData.append("fees[isFree]", String(form.fees.isFree));
    formData.append("isActive", String(form.isActive));
    formData.append("order", String(form.order));
    
    if (selectedFile) {
      formData.append("image", selectedFile);
    }

    try {
      const courseId = form._id || form.id;
      if (courseId) {
        await CourseAPI.update(courseId, formData);
      } else {
        await CourseAPI.create(formData);
      }
      setOpen(false);
      setForm(emptyCourse);
      setSelectedFile(null);
      await load();
    } catch (error) {
      console.error("Error saving course:", error);
    }
  };

  const onDelete = async (id: string) => {
    if(!window.confirm("Are you sure?")) return;
    try {
      await CourseAPI.delete(id);
      await load();
    } catch (error) {
      console.error("Error deleting course:", error);
    }
  };

  const openAdd = () => {
    setForm(emptyCourse);
    setSelectedFile(null);
    setOpen(true);
  };

  const openEdit = (item: Course) => {
    setForm(item);
    setSelectedFile(null);
    setOpen(true);
  };

  return (
    <AdminLayout title="Courses">
      <div className="mb-3 flex justify-start sm:mb-4">
        <button
          onClick={openAdd}
          className="rounded-xl bg-teal-700 px-4 py-2 text-sm font-semibold text-white hover:bg-teal-600"
        >
          + Add Course
        </button>
      </div>

      <div className="grid grid-cols-1 gap-2.5 sm:gap-3 lg:grid-cols-2">
        {courses.map((item) => (
          <div key={item._id || item.id} className="rounded-xl border border-slate-200 bg-white p-3 shadow-sm sm:p-4">
            <div className="mb-2 flex items-center justify-between gap-3">
              <h3 className="text-base font-bold text-teal-900">{item.name}</h3>
              <span className="rounded-full bg-teal-50 px-2.5 py-1 text-xs font-semibold text-teal-700">{item.category}</span>
            </div>

            <p className="mb-2 text-sm text-slate-600">{item.description}</p>

            <p className="text-xs text-slate-500">Duration: {item.duration?.value} {item.duration?.unit}</p>
            <p className="text-xs text-slate-500">Students: {item.totalStudents}</p>
            <p className="text-xs text-slate-500">Fees: {item.fees?.isFree ? "Free" : `Rs ${item.fees?.amount ?? 0}`}</p>
            <p className="text-xs text-slate-500">Display Order: {item.order} (0 means first)</p>
            <p className="text-xs text-slate-500">Active: {item.isActive ? "Yes" : "No"}</p>
            {item.image?.url && <p className="truncate text-xs text-slate-500">Image: Added</p>}

            <div className="mt-3 flex gap-2">
              <button onClick={() => openEdit(item)} className="rounded-lg bg-amber-500 px-3 py-1.5 text-xs font-semibold text-white">Edit</button>
              <button onClick={() => onDelete(item._id || item.id as string)} className="rounded-lg bg-rose-600 px-3 py-1.5 text-xs font-semibold text-white">Delete</button>
            </div>
          </div>
        ))}
      </div>

      {open && (
        <div className="fixed inset-0 z-50 grid place-items-center bg-black/50 p-3">
          <div className="max-h-[90vh] w-full max-w-2xl overflow-auto rounded-2xl bg-white p-4 sm:p-5">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-xl font-bold text-teal-900">{form._id || form.id ? "Edit Course" : "Add Course"}</h3>
              <button onClick={() => setOpen(false)} className="rounded-lg border px-2 py-1 text-sm">Close</button>
            </div>
            <form onSubmit={onSave} className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <div>
                <label className="mb-1 block text-sm font-semibold text-slate-700">Course ID (Internal)</label>
                <input className="w-full rounded-lg border p-2" placeholder="Auto assigned" value={form._id || form.id || ""} disabled />
              </div>
              <div>
                <label className="mb-1 block text-sm font-semibold text-slate-700">Course Name</label>
                <input className="w-full rounded-lg border p-2" placeholder="Ex: Hifz ul Quran" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
              </div>
              <div>
                <label className="mb-1 block text-sm font-semibold text-slate-700">Category</label>
                <input className="w-full rounded-lg border p-2" placeholder="Ex: Hifz" value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} required />
              </div>
              <div>
                <label className="mb-1 block text-sm font-semibold text-slate-700">Level</label>
                <select className="w-full rounded-lg border p-2" value={form.level} onChange={(e) => setForm({ ...form, level: e.target.value })} required>
                  {levelOptions.map((level) => (
                    <option key={level} value={level}>
                      {level}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="mb-1 block text-sm font-semibold text-slate-700">Total Students</label>
                <input className="w-full rounded-lg border p-2" type="number" placeholder="Ex: 50" value={form.totalStudents} onChange={(e) => setForm({ ...form, totalStudents: Number(e.target.value) })} required />
              </div>
              <div>
                <label className="mb-1 block text-sm font-semibold text-slate-700">Duration Value</label>
                <input className="w-full rounded-lg border p-2" type="number" placeholder="Ex: 3" value={form.duration.value} onChange={(e) => setForm({ ...form, duration: { ...form.duration, value: Number(e.target.value) } })} required />
              </div>
              <div>
                <label className="mb-1 block text-sm font-semibold text-slate-700">Duration Unit</label>
                <input className="w-full rounded-lg border p-2" placeholder="Years / Months" value={form.duration.unit} onChange={(e) => setForm({ ...form, duration: { ...form.duration, unit: e.target.value } })} required />
              </div>
              <div>
                <label className="mb-1 block text-sm font-semibold text-slate-700">Fees Amount</label>
                <input className="w-full rounded-lg border p-2" type="number" placeholder="0 for free" value={form.fees.amount} onChange={(e) => setForm({ ...form, fees: { ...form.fees, amount: Number(e.target.value) } })} />
              </div>
              <div>
                <label className="mb-1 block text-sm font-semibold text-slate-700">Display Order</label>
                <input className="w-full rounded-lg border p-2" type="number" placeholder="0, 1, 2..." value={form.order} onChange={(e) => setForm({ ...form, order: Number(e.target.value) })} />
                <p className="mt-1 text-xs text-slate-500">Use 0 for first, 1 for second, 2 for third.</p>
              </div>
              <div className="sm:col-span-2">
                <label className="mb-1 block text-sm font-semibold text-slate-700">Course Image Upload</label>
                <input className="w-full rounded-lg border p-2" type="file" accept="image/*" onChange={onImageFileChange} />
                <p className="mt-1 text-xs text-slate-500">Choose an image file. It will be saved with this course.</p>
              </div>
              <div className="sm:col-span-2">
                <label className="mb-1 block text-sm font-semibold text-slate-700">Image ID / File Name</label>
                <input className="w-full rounded-lg border p-2" placeholder="Auto from uploaded file" value={form.image.public_id} onChange={(e) => setForm({ ...form, image: { ...form.image, public_id: e.target.value } })} />
              </div>
              {form.image.url && (
                <div className="sm:col-span-2">
                  <label className="mb-1 block text-sm font-semibold text-slate-700">Image Preview</label>
                  <img src={form.image.url} alt="Course Preview" className="h-40 w-full rounded-lg border object-cover" />
                </div>
              )}
              <label className="flex items-center gap-2 rounded-lg border p-2 text-sm">
                <input type="checkbox" checked={form.fees.isFree} onChange={(e) => setForm({ ...form, fees: { ...form.fees, isFree: e.target.checked } })} />
                Free Course (when checked, Fees Amount can stay 0)
              </label>
              <label className="flex items-center gap-2 rounded-lg border p-2 text-sm">
                <input type="checkbox" checked={form.isActive} onChange={(e) => setForm({ ...form, isActive: e.target.checked })} />
                Active Course
              </label>
              <div className="sm:col-span-2">
                <label className="mb-1 block text-sm font-semibold text-slate-700">Description</label>
                <textarea className="w-full rounded-lg border p-2" rows={4} placeholder="Course details..." value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} required />
              </div>
              <div className="sm:col-span-2 flex justify-end">
                <button type="submit" className="rounded-xl bg-teal-700 px-4 py-2 text-sm font-semibold text-white">Save</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </AdminLayout>
  );
};

export default AdminCourses;
