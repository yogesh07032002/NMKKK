// src/pages/Placements.jsx
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import EligibilityModal from "../components/EligibilityModal";
import VideoCarousel from "../components/VideoCarousel";
import api from "../utils/api";

export default function Placements() {
  const [open, setOpen] = useState(false);
  const [recentJobs, setRecentJobs] = useState([]);
  const [videos, setVideos] = useState([]);
  const navigate = useNavigate();

  /* ---------------------------------------
        LOAD RECENT JOBS
  ---------------------------------------- */
  useEffect(() => {
    const load = async () => {
      try {
        const res = await api.get("/jobs?limit=4");
        setRecentJobs(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    load();
  }, []);

  /* ---------------------------------------
        LOAD VIDEOS
  ---------------------------------------- */
  useEffect(() => {
    const load = async () => {
      try {
        const res = await api.get("/videos");
        setVideos(res.data);
      } catch (err) {
        console.error("Failed to load videos", err);
      }
    };
    load();
  }, []);

  /* ---------------------------------------
        SPLIT VIDEOS INTO 2 CAROUSELS
        Pattern: C1 gets indices 0,2,4...
                 C2 gets indices 1,3,5...
  ---------------------------------------- */
  const carousel1 = videos.filter((_, idx) => idx % 2 === 0);
  const carousel2 = videos.filter((_, idx) => idx % 2 !== 0);

  return (
    <div className="space-y-16">

  {/* ================= HERO / INTRO ================= */}
  <section className="relative rounded-2xl overflow-hidden shadow-lg">
    {/* Background Image */}
    <div
      className="absolute inset-0 bg-cover bg-center"
      style={{
        backgroundImage:
          "url('/placement.png')",
      }}
    />
    <div className="absolute inset-0 bg-[#0F2A3A]/80" />

    <div className="relative max-w-6xl mx-auto px-8 py-20 grid lg:grid-cols-2 gap-12 items-center text-white">
      {/* LEFT */}
      <div>
        <h1 className="text-4xl md:text-5xl font-extrabold leading-tight">
          Build Your Career with <br /> Confidence & Clarity
        </h1>

        <p className="mt-5 text-lg text-[#D7E3EA] max-w-xl">
          NMK Career & Job Guidance Portal helps students and graduates
          identify the right opportunities, understand eligibility, and
          prepare confidently for placements and government exams.
        </p>

        <div className="mt-8 flex flex-wrap gap-4">
          <button
            onClick={() => setOpen(true)}
            className="px-7 py-3 bg-[#4F8F9D] hover:bg-[#5E9AA6] rounded-xl font-semibold shadow"
          >
            Check Eligibility
          </button>

          <button
            onClick={() => navigate("/guidance")}
            className="px-7 py-3 bg-white/10 border border-white/30 rounded-xl font-semibold"
          >
            Get Career Guidance
          </button>

          <button
            onClick={() => navigate("/jobs")}
            className="px-7 py-3 bg-transparent underline underline-offset-4"
          >
            Browse Jobs
          </button>
        </div>
      </div>

      {/* RIGHT INFO CARD */}
      <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
        <h4 className="font-semibold text-lg mb-4">
          Why Choose NMK Portal?
        </h4>
        <ul className="space-y-3 text-sm text-[#E6EEF3]">
          <li>✔ Eligibility-based job recommendations</li>
          <li>✔ Verified government & private listings</li>
          <li>✔ Centralized career guidance resources</li>
          <li>✔ Time-saving & student-focused design</li>
        </ul>
      </div>
    </div>
  </section>

  {/* ================= FEATURES ================= */}
  <section className="max-w-6xl mx-auto px-4 text-center">
    <h2 className="text-3xl font-extrabold text-[#0F2A3A]">
      One Platform. Multiple Career Solutions.
    </h2>
    <p className="mt-3 text-[#6B7C87] max-w-2xl mx-auto">
      Designed to support students from career discovery to final placement.
    </p>

    <div className="grid md:grid-cols-3 gap-8 mt-12">
      {[
        {
          title: "Career Roadmaps",
          desc: "Structured paths for government & private sector roles.",
          icon: "🧭",
        },
        {
          title: "Placement Assistance",
          desc: "Job listings filtered by eligibility & qualifications.",
          icon: "💼",
        },
        {
          title: "Interview Preparation",
          desc: "Guidance videos and preparation resources.",
          icon: "🎯",
        },
      ].map((item) => (
        <div
          key={item.title}
          className="bg-white rounded-2xl p-8 shadow-sm border hover:shadow-md transition"
        >
          <div className="text-4xl">{item.icon}</div>
          <h3 className="mt-4 font-bold text-lg text-[#0F2A3A]">
            {item.title}
          </h3>
          <p className="mt-2 text-sm text-[#6B7C87]">
            {item.desc}
          </p>
        </div>
      ))}
    </div>
  </section>

  {/* ================= JOBS + VIDEOS ================= */}
  <section className="max-w-6xl mx-auto px-4 grid lg:grid-cols-3 gap-8">

    {/* RECENT JOBS */}
    <div className="lg:col-span-2 bg-white rounded-2xl border shadow-sm p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-bold text-[#0F2A3A]">
          Recently Posted Jobs
        </h3>
        <button
          onClick={() => navigate("/jobs")}
          className="text-sm text-[#4F8F9D] underline"
        >
          View All
        </button>
      </div>

      {recentJobs.length === 0 ? (
        <p className="text-sm text-gray-500">
          No recent jobs found.
        </p>
      ) : (
        <div className="space-y-4">
          {recentJobs.map((job) => (
            <div
              key={job._id}
              className="p-4 border rounded-xl hover:bg-[#F6F9FB] transition flex justify-between items-center"
            >
              <div>
                <h4 className="font-semibold text-[#0F2A3A]">
                  {job.title}
                </h4>
                <p className="text-sm text-gray-600">
                  {job.organization}
                </p>
              </div>

              <button
                onClick={() => navigate(`/jobs/${job._id}`)}
                className="px-4 py-2 text-sm font-semibold rounded-lg bg-[#0F2A3A] text-white hover:bg-[#163C52]"
              >
                View
              </button>
            </div>
          ))}
        </div>
      )}
    </div>

    {/* GUIDANCE VIDEOS */}
    <div className="bg-white rounded-2xl border shadow-sm p-6 space-y-6">
      <h4 className="font-bold text-lg text-[#0F2A3A]">
        Career Guidance Videos
      </h4>

      {videos.length === 0 && (
        <p className="text-sm text-gray-500">
          No guidance videos available.
        </p>
      )}

      {carousel1.length > 0 && <VideoCarousel videos={carousel1} />}
      {carousel2.length > 0 && <VideoCarousel videos={carousel2} />}
    </div>
  </section>

  {/* ================= MODAL ================= */}
  <EligibilityModal isOpen={open} onClose={() => setOpen(false)} />

</div>

  );
}
