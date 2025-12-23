import { useEffect, useState } from "react";
import api from "../../utils/api";

export default function AdminNotifications() {
  const [notifications, setNotifications] = useState([]);
  const [text, setText] = useState("");
  const [link, setLink] = useState("");
  const [priority, setPriority] = useState("normal");
  const [active, setActive] = useState(true);

  const load = () => {
    api.get("/notifications").then((res) => setNotifications(res.data));
  };

  useEffect(() => {
    load();
  }, []);

  const create = async (e) => {
    e.preventDefault();

    await api.post("/notifications", {
      text,
      link,
      priority,
      active,
    });

    setText("");
    setLink("");
    setPriority("normal");
    setActive(true);
    load();
  };

  const remove = async (id) => {
    if (!window.confirm("Delete this notification?")) return;
    await api.delete(`/notifications/${id}`);
    load();
  };

  const toggleActive = async (id, current) => {
    await api.put(`/notifications/${id}`, { active: !current });
    load();
  };

  return (
    <div className="space-y-10">
      <h1 className="text-3xl font-bold">Manage Notifications</h1>

      {/* CREATE FORM */}
      <div className="bg-white p-6 rounded-xl shadow max-w-2xl border">
        <h2 className="text-xl font-semibold mb-4">Add New Notification</h2>

        <form onSubmit={create} className="space-y-4">
          <input
            type="text"
            className="w-full border p-2 rounded"
            placeholder="Notification text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            required
          />

          <input
            type="text"
            className="w-full border p-2 rounded"
            placeholder="Optional link"
            value={link}
            onChange={(e) => setLink(e.target.value)}
          />

          <select
            className="w-full border p-2 rounded"
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
          >
            <option value="normal">Normal</option>
            <option value="high">High Priority</option>
          </select>

          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={active}
              onChange={() => setActive((prev) => !prev)}
            />
            Active
          </label>

          <button className="bg-blue-600 text-white px-4 py-2 rounded">
            Add Notification
          </button>
        </form>
      </div>

      {/* LIST */}
      <div className="bg-white p-6 rounded-xl shadow border">
        <h2 className="text-xl font-semibold mb-4">All Notifications</h2>

        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b bg-gray-50">
              <th className="p-2">Text</th>
              <th className="p-2">Priority</th>
              <th className="p-2">Active</th>
              <th className="p-2">Actions</th>
            </tr>
          </thead>

          <tbody>
            {notifications.map((n) => (
              <tr key={n._id} className="border-b">
                <td className="p-2">{n.text}</td>
                <td className="p-2 capitalize">{n.priority}</td>
                <td className="p-2">
                  <button
                    onClick={() => toggleActive(n._id, n.active)}
                    className={`px-3 py-1 rounded text-white ${
                      n.active ? "bg-green-600" : "bg-gray-500"
                    }`}
                  >
                    {n.active ? "Active" : "Inactive"}
                  </button>
                </td>

                <td className="p-2 space-x-2">
                  <button
                    onClick={() => remove(n._id)}
                    className="bg-red-600 text-white px-3 py-1 rounded"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
