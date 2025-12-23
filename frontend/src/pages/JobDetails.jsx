import { useParams, Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import api from "../utils/api";

export default function JobDetails() {
  const { id } = useParams();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const res = await api.get(`/jobs/${id}`);
        setJob(res.data);
      } catch (err) {
        console.error("Error loading job:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchJob();
  }, [id]);

  if (loading) return <div>Loading…</div>;
  if (!job) return <div className="text-red-600">Job not found</div>;

  // If job is closed
  if (job.status === "closed") {
    return (
      <div className="space-y-4">
        <Link to="/jobs" className="text-blue-600 underline">
          ← Back to Jobs
        </Link>

        <h1 className="text-3xl font-bold text-red-600">This Job is Closed</h1>

        <p className="text-gray-700">
          The application period for this job has ended. You can browse other active job opportunities on the jobs page.
        </p>

        <div className="p-5 border rounded-lg bg-white shadow space-y-2">
          <p><strong>Title:</strong> {job.title}</p>
          <p><strong>Organization:</strong> {job.organization}</p>
          <p><strong>Location:</strong> {job.location}</p>
          <p><strong>Qualification:</strong> {job.qualification}</p>
          <p><strong>Last Date:</strong> {job.lastDate ? new Date(job.lastDate).toLocaleDateString() : "—"}</p>
        </div>
      </div>
    );
  }

  // If job is OPEN
  return (
    <div className="space-y-4">
      <Link to="/jobs" className="text-blue-600 underline">
        ← Back to Jobs
      </Link>

      <h1 className="text-3xl font-bold">{job.title}</h1>
      <p className="text-lg text-gray-600">{job.organization}</p>

      <div className="p-5 border rounded-lg shadow-sm bg-white space-y-2">
        <p><strong>Location:</strong> {job.location}</p>
        <p><strong>Qualification:</strong> {job.qualification}</p>
        <p><strong>Last Date:</strong> {job.lastDate ? new Date(job.lastDate).toLocaleDateString() : "—"}</p>
        <p><strong>Status:</strong> {job.status}</p>
      </div>

      {/* APPLY BUTTON VISIBLE ONLY IF OPEN */}
      <a
        href={job.applyLink}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-block bg-green-600 text-white px-5 py-2 rounded"
      >
        Apply Now
      </a>

      {/* PDF download only if job OPEN */}
      {job.notificationPdf && (
        <a
          href={`http://localhost:5000${job.notificationPdf}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block bg-blue-600 text-white px-5 py-2 rounded ml-2"
        >
          Download Notification PDF
        </a>
      )}
    </div>
  );
}
