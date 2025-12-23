// src/pages/admin/AdminJobs.jsx
import React, { useEffect, useState } from "react";
import api from "../../utils/api";
import { Link } from "react-router-dom";

export default function AdminJobs() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchJobs = async () => {
    setLoading(true);
    try {
      // Admin will fetch all jobs - pass status=all
      const res = await api.get("/jobs?status=all&limit=1000");
      setJobs(res.data || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  const remove = async (id) => {
    if (!confirm("Delete this job?")) return;
    try {
      await api.delete(`/jobs/${id}`);
      fetchJobs();
    } catch (err) {
      alert("Delete failed");
    }
  };

  const changeStatus = async (id, toStatus) => {
    try {
      await api.patch(`/jobs/${id}/status`, { status: toStatus });
      fetchJobs();
    } catch (err) {
      alert("Status change failed");
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold">Manage Jobs</h1>
        <Link to="/admin/add-job" className="bg-blue-600 text-white px-4 py-2 rounded">Add Job</Link>
      </div>

      <div className="bg-white rounded shadow overflow-x-auto">
        <table className="min-w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="p-3 text-left">Title</th>
              <th className="p-3 text-left">Org</th>
              <th className="p-3 text-left">Location</th>
              <th className="p-3 text-left">Last Date</th>
              <th className="p-3 text-left">Status</th>
              <th className="p-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td className="p-4">Loading...</td></tr>
            ) : jobs.length === 0 ? (
              <tr><td className="p-4">No jobs found.</td></tr>
            ) : jobs.map((j) => (
              <tr key={j._id} className="border-t">
                <td className="p-3">{j.title}</td>
                <td className="p-3">{j.organization}</td>
                <td className="p-3">{j.location}</td>
                <td className="p-3">{j.lastDate ? new Date(j.lastDate).toLocaleDateString() : "-"}</td>
                <td className="p-3">
                  <span className={`px-2 py-1 rounded text-sm ${j.status==="active" ? "bg-green-100 text-green-700" : j.status==="closed" ? "bg-yellow-100 text-yellow-700" : "bg-gray-100 text-gray-700"}`}>
                    {j.status}
                  </span>
                </td>
                <td className="p-3 space-x-2">
                  <Link to={`/admin/edit-job/${j._id}`} className="text-blue-600">Edit</Link>
                  <button onClick={() => changeStatus(j._id, j.status === "active" ? "closed" : "active")} className="text-sm px-2 py-1 bg-gray-100 rounded">
                    {j.status === "active" ? "Close" : "Activate"}
                  </button>
                  <button onClick={() => remove(j._id)} className="text-red-600">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
