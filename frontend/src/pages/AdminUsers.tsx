import { useEffect, useState } from "react";
import AdminLayout from "@/components/AdminLayout";

type UserItem = {
  id: string;
  name: string;
  role: string;
  email: string;
  status: string;
};

const API = "http://localhost:5000";

const AdminUsers = () => {
  const [users, setUsers] = useState<UserItem[]>([]);

  useEffect(() => {
    const load = async () => {
      const res = await fetch(`${API}/api/users`);
      const json = await res.json();
      setUsers(Array.isArray(json?.data) ? json.data : []);
    };
    void load();
  }, []);

  return (
    <AdminLayout title="Users">
      <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2 sm:gap-3 lg:grid-cols-3">
        {users.map((user) => (
          <article key={user.id} className="rounded-xl border border-slate-200 bg-white p-3 shadow-sm sm:p-4">
            <div className="mb-2.5 flex items-center gap-3 sm:mb-3">
              <img src="/schoollogo.png" alt="User" className="h-10 w-10 rounded-full border border-teal-100 bg-teal-50 p-1 object-contain" />
              <div>
                <h3 className="font-bold text-teal-900">{user.name}</h3>
                <p className="text-xs text-slate-500">{user.role}</p>
              </div>
            </div>
            <p className="text-sm text-slate-600">{user.email}</p>
            <p className="mt-1.5 inline-block rounded-full bg-emerald-50 px-2 py-1 text-xs font-semibold text-emerald-700 sm:mt-2">
              {user.status}
            </p>
          </article>
        ))}
      </div>
    </AdminLayout>
  );
};

export default AdminUsers;
