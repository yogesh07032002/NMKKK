// src/pages/admin/AdminAddJob.jsx
import React, { useState } from "react";
import api from "../../utils/api";
import { useNavigate } from "react-router-dom";

export default function AdminAddJob() {
  const [form, setForm] = useState({
    title: "",
    organization: "",
    department: "",
    type: "State Govt",
    qualification: "",
    location: "",
    salary: "",
    vacancies: "",
    lastDate: "",
    applyLink: "",
    description: ""
  });

  const [eligibility, setEligibility] = useState({
    minAge: "",
    maxAge: "",
    minSSC: "",
    minHSC: "",
    minGraduationScore: "",
    experienceRequired: "",
    otherCriteria: ""
  });

  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (k, v) => setForm({ ...form, [k]: v });
  const handleElig = (k, v) => setEligibility({ ...eligibility, [k]: v });

  const submit = async (e) => {
    e.preventDefault();
    if (!form.title || !form.applyLink) return alert("Title and Apply Link required");
    setLoading(true);

    try {
      const fd = new FormData();

      Object.keys(form).forEach((k) => fd.append(k, form[k]));

      fd.append("eligibility", JSON.stringify(eligibility));

      if (file) fd.append("notificationPdf", file);

      // ❗IMPORTANT: Do NOT set Content-Type manually
      await api.post("/jobs", fd);

      alert("Job created");
      navigate("/admin/jobs");
    } catch (err) {
      console.error("Create job failed:", err);
      alert("Create failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl bg-white p-6 rounded shadow">
      <h1 className="text-2xl font-bold mb-4">Add New Job</h1>

      <form onSubmit={submit} className="space-y-3">
        <input className="w-full border p-2 rounded" placeholder="Title" value={form.title} onChange={e=>handleChange("title", e.target.value)} required />

        <input className="w-full border p-2 rounded" placeholder="Organization" value={form.organization} onChange={e=>handleChange("organization", e.target.value)} />

        <input className="w-full border p-2 rounded" placeholder="Department" value={form.department} onChange={e=>handleChange("department", e.target.value)} />

        <div className="flex gap-3">
          <input className="flex-1 border p-2 rounded" placeholder="Qualification" value={form.qualification} onChange={e=>handleChange("qualification", e.target.value)} />

          <select className="w-40 border p-2 rounded" value={form.type} onChange={e=>handleChange("type", e.target.value)}>
            <option>State Govt</option>
            <option>Central Govt</option>
            <option>Private</option>
          </select>
        </div>

        <div className="flex gap-3">
          <input className="flex-1 border p-2 rounded" placeholder="Location" value={form.location} onChange={e=>handleChange("location", e.target.value)} />

          <input className="w-40 border p-2 rounded" type="date" value={form.lastDate} onChange={e=>handleChange("lastDate", e.target.value)} />
        </div>

        <input className="w-full border p-2 rounded" placeholder="Apply Link (http...)" value={form.applyLink} onChange={e=>handleChange("applyLink", e.target.value)} required />

        <textarea className="w-full border p-2 rounded" placeholder="Short description" value={form.description} onChange={e=>handleChange("description", e.target.value)} />

        {/* Eligibility */}
        <div className="p-3 border rounded space-y-2 bg-gray-50">
          <h3 className="font-semibold">Eligibility (optional)</h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
            <input placeholder="Min Age" value={eligibility.minAge} onChange={e=>handleElig("minAge", e.target.value)} className="border p-2 rounded" />
            <input placeholder="Max Age" value={eligibility.maxAge} onChange={e=>handleElig("maxAge", e.target.value)} className="border p-2 rounded" />
            <input placeholder="Min SSC (%)" value={eligibility.minSSC} onChange={e=>handleElig("minSSC", e.target.value)} className="border p-2 rounded" />
            <input placeholder="Min HSC (%)" value={eligibility.minHSC} onChange={e=>handleElig("minHSC", e.target.value)} className="border p-2 rounded" />
            <input placeholder="Graduation Score (%)" value={eligibility.minGraduationScore} onChange={e=>handleElig("minGraduationScore", e.target.value)} className="border p-2 rounded" />
            <input placeholder="Experience (years)" value={eligibility.experienceRequired} onChange={e=>handleElig("experienceRequired", e.target.value)} className="border p-2 rounded" />
          </div>

          <textarea placeholder="Other criteria (optional)" value={eligibility.otherCriteria} onChange={e=>handleElig("otherCriteria", e.target.value)} className="w-full border p-2 rounded" />
        </div>

        <input type="file" accept="application/pdf" onChange={(e)=>setFile(e.target.files?.[0] || null)} />

        <div className="flex gap-3">
          <button disabled={loading} className="bg-green-600 text-white px-4 py-2 rounded">
            {loading ? "Saving..." : "Create Job"}
          </button>
          <button type="button" onClick={()=>navigate("/admin/jobs")} className="bg-gray-100 px-4 py-2 rounded">Cancel</button>
        </div>
      </form>
    </div>
  );
}
