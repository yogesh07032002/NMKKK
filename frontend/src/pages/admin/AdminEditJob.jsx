// src/pages/admin/AdminEditJob.jsx
import React, { useEffect, useState } from "react";
import api from "../../utils/api";
import { useNavigate, useParams } from "react-router-dom";

export default function AdminEditJob() {
  const { id } = useParams();
  const navigate = useNavigate();

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
    description: "",
    notificationPdf: "",
  });

  const [eligibility, setEligibility] = useState({
    minAge: "",
    maxAge: "",
    minSSC: "",
    minHSC: "",
    minGraduationScore: "",
    experienceRequired: "",
    otherCriteria: "",
  });

  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  /* -------------------- LOAD JOB -------------------- */
  useEffect(() => {
    const loadJob = async () => {
      try {
        const res = await api.get(`/jobs/${id}?allowClosed=true`);
        const j = res.data;

        setForm({
          title: j.title,
          organization: j.organization,
          department: j.department,
          type: j.type || "State Govt",
          qualification: j.qualification,
          location: j.location,
          salary: j.salary,
          vacancies: j.vacancies,
          lastDate: j.lastDate ? j.lastDate.slice(0, 10) : "",
          applyLink: j.applyLink,
          description: j.description,
          notificationPdf: j.notificationPdf || "",
        });

        setEligibility({
          minAge: j.eligibility?.minAge || "",
          maxAge: j.eligibility?.maxAge || "",
          minSSC: j.eligibility?.minSSC || "",
          minHSC: j.eligibility?.minHSC || "",
          minGraduationScore: j.eligibility?.minGraduationScore || "",
          experienceRequired: j.eligibility?.experienceRequired || "",
          otherCriteria: j.eligibility?.otherCriteria || "",
        });
      } catch (err) {
        console.error("Load job failed:", err);
      }
    };
    loadJob();
  }, [id]);

  const handleChange = (k, v) => setForm((s) => ({ ...s, [k]: v }));
  const handleElig = (k, v) => setEligibility((s) => ({ ...s, [k]: v }));

  /* -------------------- SUBMIT UPDATE -------------------- */
  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const fd = new FormData();

      Object.keys(form).forEach((k) => {
        if (k !== "notificationPdf") fd.append(k, form[k]);
      });

      fd.append("eligibility", JSON.stringify(eligibility));

      if (file) fd.append("notificationPdf", file);

      // ❗ DO NOT set "Content-Type"
      await api.put(`/jobs/${id}`, fd);

      alert("Job updated");
      navigate("/admin/jobs");
    } catch (err) {
      console.error("Update failed:", err);
      alert("Update failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl bg-white p-6 rounded shadow">
      <h1 className="text-2xl font-bold mb-4">Edit Job</h1>

      <form onSubmit={submit} className="space-y-3">
        <input className="w-full border p-2 rounded" value={form.title} onChange={(e)=>handleChange("title", e.target.value)} placeholder="Title" />

        <input className="w-full border p-2 rounded" value={form.organization} onChange={(e)=>handleChange("organization", e.target.value)} placeholder="Organization" />

        <input className="w-full border p-2 rounded" value={form.department} onChange={(e)=>handleChange("department", e.target.value)} placeholder="Department" />

        <select className="w-full border p-2 rounded" value={form.type} onChange={(e)=>handleChange("type", e.target.value)}>
          <option>State Govt</option>
          <option>Central Govt</option>
          <option>Private</option>
        </select>

        <input className="w-full border p-2 rounded" value={form.qualification} onChange={(e)=>handleChange("qualification", e.target.value)} placeholder="Qualification" />

        <input className="w-full border p-2 rounded" value={form.location} onChange={(e)=>handleChange("location", e.target.value)} placeholder="Location" />

        <input type="date" className="w-full border p-2 rounded" value={form.lastDate} onChange={(e)=>handleChange("lastDate", e.target.value)} />

        <input className="w-full border p-2 rounded" value={form.applyLink} onChange={(e)=>handleChange("applyLink", e.target.value)} placeholder="Apply Link (http...)" />

        <textarea className="w-full border p-2 rounded" value={form.description} onChange={(e)=>handleChange("description", e.target.value)} placeholder="Description" />

        {/* Eligibility */}
        <div className="border p-3 rounded bg-gray-50 space-y-2">
          <h3 className="font-semibold">Eligibility</h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
            <input value={eligibility.minAge} onChange={(e)=>handleElig("minAge", e.target.value)} placeholder="Min Age" className="border p-2 rounded" />
            <input value={eligibility.maxAge} onChange={(e)=>handleElig("maxAge", e.target.value)} placeholder="Max Age" className="border p-2 rounded" />
            <input value={eligibility.minSSC} onChange={(e)=>handleElig("minSSC", e.target.value)} placeholder="Min SSC (%)" className="border p-2 rounded" />
            <input value={eligibility.minHSC} onChange={(e)=>handleElig("minHSC", e.target.value)} placeholder="Min HSC (%)" className="border p-2 rounded" />
            <input value={eligibility.minGraduationScore} onChange={(e)=>handleElig("minGraduationScore", e.target.value)} placeholder="Graduation Score (%)" className="border p-2 rounded" />
            <input value={eligibility.experienceRequired} onChange={(e)=>handleElig("experienceRequired", e.target.value)} placeholder="Experience (yrs)" className="border p-2 rounded" />
          </div>

          <textarea value={eligibility.otherCriteria} onChange={(e)=>handleElig("otherCriteria", e.target.value)} placeholder="Other criteria" className="w-full border p-2 rounded" />
        </div>

        {/* PDF Upload */}
        <div className="space-y-1">
          <label className="font-medium">Notification PDF</label>

          {form.notificationPdf && (
            <a
              href={`${import.meta.env.VITE_API_BASE}${form.notificationPdf}`}
              target="_blank"
              rel="noreferrer"
              className="text-blue-600 underline text-sm block mb-2"
            >
              View current PDF
            </a>
          )}

          <input type="file" accept="application/pdf" onChange={(e)=>setFile(e.target.files?.[0] || null)} />
        </div>

        <button disabled={loading} className="bg-blue-600 text-white px-4 py-2 rounded">
          {loading ? "Updating…" : "Update Job"}
        </button>
      </form>
    </div>
  );
}
