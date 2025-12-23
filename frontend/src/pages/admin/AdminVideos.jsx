import React, { useEffect, useState } from "react";
import api from "../../utils/api";
import { TrashIcon, PlusIcon } from "@heroicons/react/24/outline";

export default function AdminVideos() {
  const [videos, setVideos] = useState([]);
  const [form, setForm] = useState({ title: "", url: "", description: "" });
  const [loading, setLoading] = useState(false);

  const load = async () => {
    try {
      const res = await api.get("/videos");
      setVideos(res.data);
    } catch (err) {
      console.error(err);
      alert("Failed to fetch videos");
    }
  };

  useEffect(() => { load(); }, []);

  const submit = async (e) => {
    e.preventDefault();
    if (!form.title || !form.url) return alert("Title & URL required");
    setLoading(true);
    try {
      const res = await api.post("/videos", form);
      setVideos(v => [res.data, ...v]);
      setForm({ title: "", url: "", description: "" });
    } catch (err) {
      alert(err.response?.data?.msg || "Failed");
    } finally { setLoading(false); }
  };

  const remove = async (id) => {
    if (!confirm("Delete this video?")) return;
    try {
      await api.delete(`/videos/${id}`);
      setVideos(v => v.filter(x => x._id !== id));
    } catch (err) {
      alert("Delete failed");
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold">Manage Guidance Videos</h2>

      <form onSubmit={submit} className="grid gap-2 md:grid-cols-3">
        <input className="border p-2 rounded" placeholder="Title" value={form.title} onChange={e=>setForm({...form, title:e.target.value})} />
        <input className="border p-2 rounded md:col-span-2" placeholder="YouTube URL (https://...)" value={form.url} onChange={e=>setForm({...form, url:e.target.value})} />
        <textarea className="border p-2 rounded md:col-span-3" placeholder="Short description (optional)" value={form.description} onChange={e=>setForm({...form, description:e.target.value})} />
        <div className="md:col-span-3 flex gap-2">
          <button className="bg-green-600 text-white px-4 py-2 rounded flex items-center gap-2" disabled={loading}>
            <PlusIcon className="w-4 h-4" /> Add Video
          </button>
        </div>
      </form>

      <div className="grid gap-4">
        {videos.map((v) => (
          <div key={v._id} className="flex items-center justify-between bg-white p-3 rounded shadow">
            <div className="flex items-center gap-3">
              <img src={v.thumbnail} alt={v.title} className="w-28 h-16 object-cover rounded" />
              <div>
                <div className="font-semibold">{v.title}</div>
                <div className="text-sm text-gray-600">{v.description}</div>
              </div>
            </div>

            <div className="flex gap-2 items-center">
              <a href={v.url} target="_blank" rel="noreferrer" className="text-sm text-blue-600 underline">Open</a>
              <button onClick={() => remove(v._id)} className="text-red-600 p-2 rounded hover:bg-red-50">
                <TrashIcon className="w-5 h-5" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
