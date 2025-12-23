// src/pages/Home.jsx
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../utils/api";
import AgeCalculatorModal from "../components/AgeCalculatorModal";
import PosterCarousel from "../components/posters/PosterCarousel";

import {
  BriefcaseIcon,
  DocumentArrowDownIcon,
  MapPinIcon,
} from "@heroicons/react/24/outline";

export default function Home() {
  const [latestJobs, setLatestJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [notifications, setNotifications] = useState([]);
  const [openAgeModal, setOpenAgeModal] = useState(false);

  // posters array (since now multiple)
  const [posters, setPosters] = useState([]);
  const [loadingPosters, setLoadingPosters] = useState(true);

  /* ----------------------- Fetch Jobs ----------------------- */
  useEffect(() => {
    const fetchLatest = async () => {
      try {
        const res = await api.get("/jobs?limit=4");
        setLatestJobs(res.data);
      } catch (err) {
        console.error("Error fetching latest jobs:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchLatest();
  }, []);

  /* ----------------------- Fetch Notifications ----------------------- */
  useEffect(() => {
    api
      .get("/notifications/active")
      .then((res) => setNotifications(res.data))
      .catch(() => setNotifications([]));
  }, []);

  /* ----------------------- Fetch Posters ----------------------- */
  useEffect(() => {
    const loadPosters = async () => {
      setLoadingPosters(true);
      try {
        const res = await api.get("/posters");
        if (Array.isArray(res.data)) {
          setPosters(res.data);
        }
      } catch (err) {
        console.error("Failed to load posters", err);
        setPosters([]);
      } finally {
        setLoadingPosters(false);
      }
    };
    loadPosters();
  }, []);

  return (
    <div className="space-y-16 px-4 md:px-0">
      {/* -------------------------------------------------- */}
      {/* HERO SECTION */}
      {/* -------------------------------------------------- */}
      
      <section className="relative bg-[#F6F9FB] border border-[#E6EEF3] rounded-2xl shadow-sm overflow-hidden">
        {/* SUBTLE BACKGROUND IMAGE */}
        <div
          className="absolute inset-0 bg-no-repeat bg-center bg-cover opacity-[0.08]"
          style={{
            backgroundImage:
              "url('https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg?auto=compress&cs=tinysrgb&w=1600')",
          }}
        ></div>

        <div className="relative max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* LEFT CONTENT */}
          <div className="space-y-6">
            <h1 className="text-3xl md:text-5xl font-extrabold leading-tight text-[#0F2A3A]">
              NMK Career & Job
              <span className="text-[#5E9AA6]"> Guidance Portal</span>
            </h1>

            <p className="text-base md:text-lg text-[#6B7C87] max-w-xl">
              Get latest government job updates, build your resume, find nearby
              help centers, and take confident steps towards your career goals.
            </p>

            {/* SIMPLE INFO (NO CARDS) */}
            <ul className="space-y-2 text-[#0F2A3A] font-medium">
              <li>
                • Daily government job notifications (SSC, UPSC, Banking,
                Railway)
              </li>
              <li>• Easy resume builder with guided steps</li>
              <li>• Local NMK centers for career counseling & support</li>
            </ul>

            {/* ACTION BUTTONS */}
            <div className="flex gap-4 flex-wrap pt-3">
              <Link
                to="/jobs"
                className="bg-[#5E9AA6] text-white px-6 py-3 rounded-lg font-semibold shadow hover:bg-[#4F8F9D] transition"
              >
                Explore Jobs
              </Link>

              <Link
                to="/resume"
                className="bg-[#0F2A3A] text-white px-6 py-3 rounded-lg font-semibold shadow hover:bg-[#132B3C] transition"
              >
                Build Resume
              </Link>

              <button
                onClick={() => setOpenAgeModal(true)}
                className="px-6 py-3 rounded-lg font-semibold border border-[#E6EEF3] text-[#0F2A3A] bg-white hover:bg-[#EEF3F6] transition"
              >
                Calculate Age
              </button>
            </div>
          </div>

          {/* RIGHT IMAGE AREA */}
          <div className="relative flex justify-center items-center">
            {/* Yellow frame */}
            <div className="absolute right-8 top-8 w-[300px] h-[400px] bg-[#F3D28A] rounded-3xl"></div>

            {/* Main person image */}
            <img
              src="https://images.pexels.com/photos/3772616/pexels-photo-3772616.jpeg?auto=compress&cs=tinysrgb&w=800"
              alt="Professional"
              className="relative z-10 w-[280px] rounded-2xl shadow-lg object-cover"
            />

            {/* Circular image */}
            <div className="absolute bottom-0 right-0 bg-white rounded-full p-2 shadow-lg">
              <img
                src="https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=400"
                alt="Candidate"
                className="w-36 h-36 rounded-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* -------------------------------------------------- */}
      {/* NOTIFICATION PANEL (RIGHT BELOW HERO) */}
      {/* -------------------------------------------------- */}
      <section className="w-full mt-10 px-4">

  {/* HEADER */}
  <div className="relative max-w-5xl mx-auto rounded-t-xl overflow-hidden shadow-xl">

    {/* Accent glow */}
    <div className="absolute inset-0 bg-gradient-to-r from-[#5E9AA6]/20 via-transparent to-[#5E9AA6]/20 blur-xl"></div>

    <div className="relative bg-gradient-to-r from-[#0F2A3A] to-[#132B3C] text-[#F6F9FB] py-4 px-6 flex items-center gap-3">
      <span className="relative flex h-3 w-3">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#FFD166] opacity-75"></span>
        <span className="relative inline-flex rounded-full h-3 w-3 bg-[#FFD166]"></span>
      </span>

      <h3 className="text-sm md:text-lg font-bold uppercase tracking-wider">
        Live Job & Exam Alerts
      </h3>
    </div>
  </div>

  {/* TICKER */}
  <div className="relative max-w-5xl mx-auto overflow-hidden rounded-b-xl border border-[#1F3645] border-t-0">

    {/* Glass background */}
    <div className="absolute inset-0 bg-[#0E1A24]/80 backdrop-blur"></div>

    {/* Moving content */}
    <div className="relative flex items-center gap-10 py-4 px-6 animate-marquee text-sm font-medium text-[#E5EEF3]">

      {notifications.length === 0 ? (
        <span className="text-gray-400">
          No notifications available at the moment.
        </span>
      ) : (
        notifications.map((n) => (
          <span
            key={n._id}
            className={`flex items-center gap-2 whitespace-nowrap px-4 py-1.5 rounded-full border transition ${
              n.priority === "high"
                ? "bg-[#1B2F3C] border-[#FFD166]/40 text-[#FFD166] shadow-[0_0_10px_rgba(255,209,102,0.3)]"
                : "bg-[#243E4D] border-[#5E9AA6]/30 text-[#D6E4EC]"
            }`}
          >
            <span className="text-base">
              {n.priority === "high" ? "🔥" : "📢"}
            </span>
            {n.text}
          </span>
        ))
      )}
    </div>

    {/* Left & Right fade masks */}
    <div className="pointer-events-none absolute left-0 top-0 h-full w-16 bg-gradient-to-r from-[#0E1A24] to-transparent"></div>
    <div className="pointer-events-none absolute right-0 top-0 h-full w-16 bg-gradient-to-l from-[#0E1A24] to-transparent"></div>
  </div>
</section>


      {/* Add this CSS in your global stylesheet or Tailwind config */}

      {/* -------------------------------------------------- */}
      {/* MAIN 2-COLUMN LAYOUT */}
      {/* -------------------------------------------------- */}
      <section className="relative max-w-6xl mx-auto grid md:grid-cols-3 gap-10 overflow-hidden">
        {/* --------- BACKGROUND DECORATIVE SHAPES --------- */}
        <div className="absolute -top-32 -right-32 w-96 h-96 bg-[#4F8F9D]/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-72 h-72 bg-[#0F2A3A]/10 rounded-full blur-3xl"></div>

        {/* ---------------- LEFT COLUMN ---------------- */}
        <div className="md:col-span-2 space-y-12 relative z-10">
          {/* Feature Highlights */}
          <section className="grid md:grid-cols-3 gap-6 text-center">
            <div className="bg-[#EEF3F6] rounded-lg p-6 shadow hover:shadow-md transition">
              <BriefcaseIcon className="w-12 h-12 text-[#4F8F9D] mx-auto" />
              <h3 className="text-xl font-semibold mt-3 text-[#0F2A3A]">
                Latest Government Jobs
              </h3>
              <p className="text-[#6B7C87] mt-2">
                Verified and frequently updated government job notifications.
              </p>
            </div>

            <div className="bg-[#EEF3F6] rounded-lg p-6 shadow hover:shadow-md transition">
              <DocumentArrowDownIcon className="w-12 h-12 text-[#4F8F9D] mx-auto" />
              <h3 className="text-xl font-semibold mt-3 text-[#0F2A3A]">
                Easy Resume Builder
              </h3>
              <p className="text-[#6B7C87] mt-2">
                Create a professional resume in minutes.
              </p>
            </div>

            <div className="bg-[#EEF3F6] rounded-lg p-6 shadow hover:shadow-md transition">
              <MapPinIcon className="w-12 h-12 text-[#4F8F9D] mx-auto" />
              <h3 className="text-xl font-semibold mt-3 text-[#0F2A3A]">
                Help Centers Near You
              </h3>
              <p className="text-[#6B7C87] mt-2">
                Find NMK support centers across Maharashtra.
              </p>
            </div>
          </section>

          {/* Latest Jobs */}
          <section>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-3xl font-bold text-[#0F2A3A]">
                Latest Job Notifications
              </h2>
              <Link
                className="text-[#4F8F9D] font-semibold hover:underline"
                to="/jobs"
              >
                View All
              </Link>
            </div>

            {loading ? (
              <p className="text-[#6B7C87]">Loading...</p>
            ) : latestJobs.length === 0 ? (
              <p className="text-[#6B7C87]">No recent jobs available.</p>
            ) : (
              <div className="grid gap-4 md:grid-cols-2">
                {latestJobs.slice(0, 2).map((job) => (
                  <div
                    key={job._id}
                    className="p-5 border border-[#E6EEF3] rounded-lg bg-[#F6F9FB] shadow-sm hover:shadow-md transition"
                  >
                    <h3 className="text-xl font-semibold text-[#0F2A3A]">
                      {job.title}
                    </h3>
                    <p className="text-[#6B7C87] text-sm">{job.organization}</p>

                    <div className="flex gap-3 mt-2 text-sm text-[#6B7C87]">
                      <span>📍 {job.location || "—"}</span>
                      <span>🎓 {job.qualification || "—"}</span>
                    </div>

                    <p className="text-[#5E9AA6] font-medium text-sm mt-1">
                      Last Date:{" "}
                      {job.lastDate
                        ? new Date(job.lastDate).toLocaleDateString()
                        : "—"}
                    </p>

                    <Link
                      to={`/jobs/${job._id}`}
                      className="mt-4 inline-block bg-[#4F8F9D] text-white px-4 py-2 rounded hover:bg-[#5E9AA6] transition"
                    >
                      View Details
                    </Link>
                  </div>
                ))}
              </div>
            )}
          </section>
        </div>

        {/* ---------------- RIGHT COLUMN ---------------- */}
        <div className="relative z-10 space-y-6">
          {/* Gradient Info Card */}
          <div className="rounded-xl p-8 shadow-lg bg-gradient-to-br from-[#0F2A3A] to-[#4F8F9D] text-white">
            <h3 className="text-2xl font-bold">NMK Career Guidance</h3>
            <p className="mt-3 text-sm text-white/90 leading-relaxed">
              A trusted platform delivering verified government job alerts,
              career guidance, and support services to empower job seekers
              across Maharashtra.
            </p>

            <ul className="mt-4 space-y-2 text-sm">
              <li>✔ Verified job notifications</li>
              <li>✔ Career & resume assistance</li>
              <li>✔ Statewide support centers</li>
            </ul>
          </div>

          {/* Poster Carousel (Optional) */}
          {!loadingPosters && posters.length > 0 && (
            <div className="sticky top-24">
              <PosterCarousel posters={posters} />
            </div>
          )}
        </div>
      </section>

      {/* -------------------------------------------------- */}
      {/* WHATSAPP + GUIDANCE (unchanged) */}
      {/* -------------------------------------------------- */}
      <section className="max-w-6xl mx-auto space-y-20 px-4">

  {/* ================= WHATSAPP STRIP ================= */}
  <div className="grid md:grid-cols-2 gap-12 items-center relative">

    {/* Floating Background Shape */}
    <div className="absolute -left-16 top-10 w-72 h-72 bg-[#4F8F9D]/10 rounded-3xl rotate-12 hidden md:block"></div>

    {/* Image */}
    <div className="relative z-10">
      <img
        src="/Home1.png"
        alt="WhatsApp Job Alerts"
        className="w-full max-w-md mx-auto object-contain"
      />
    </div>

    {/* Content */}
    <div>
      <h2 className="text-3xl font-extrabold text-[#0F2A3A] leading-tight">
        Government Job Alerts on WhatsApp
      </h2>

      <p className="mt-4 text-[#6B7C87] leading-relaxed max-w-lg">
        Stay ahead with verified government job notifications delivered
        directly to your WhatsApp. Simple, fast, and always reliable.
      </p>

      <a
        href="#"
        target="_blank"
        className="inline-flex items-center gap-3 mt-6 text-[#4F8F9D] font-semibold group"
      >
        Join WhatsApp Channel
        <span className="text-xl group-hover:translate-x-1 transition">→</span>
      </a>
    </div>
  </div>

  {/* ================= GUIDANCE STRIP ================= */}
  <div className="grid md:grid-cols-2 gap-12 items-center relative">

    {/* Floating Background Shape */}
    <div className="absolute -right-16 top-10 w-72 h-72 bg-[#0F2A3A]/10 rounded-3xl -rotate-12 hidden md:block"></div>

    {/* Content */}
    <div>
      <h2 className="text-3xl font-extrabold text-[#0F2A3A] leading-tight">
        Career Guidance That Actually Helps
      </h2>

      <p className="mt-4 text-[#6B7C87] leading-relaxed max-w-lg">
        From competitive exams to interview preparation and skill
        development — access expert guidance designed for real careers.
      </p>

      <Link
        to="/guidance"
        className="inline-flex items-center gap-3 mt-6 text-[#0F2A3A] font-semibold group"
      >
        Explore Career Guidance
        <span className="text-xl group-hover:translate-x-1 transition">→</span>
      </Link>
    </div>

    {/* Image */}
    <div className="relative z-10">
      <img
        src="/home2.png"
        alt="Career Guidance"
        className="w-full max-w-md mx-auto object-contain"
      />
    </div>
  </div>

</section>


      {/* -------------------------------------------------- */}
      {/* STATS SECTION */}
      {/* -------------------------------------------------- */}
      <section className="relative max-w-7xl mx-auto px-6 py-20 overflow-hidden">

  {/* Soft Background Pill */}
  <div className="absolute inset-0 bg-[#F1F5FB] rounded-[3rem]"></div>

  <div className="relative z-10 grid lg:grid-cols-2 gap-14 items-center">

    {/* ================= LEFT VISUAL ================= */}
    <div className="relative flex flex-col items-start justify-center">

      {/* Illustration */}
      <img
        src="https://img.freepik.com/free-vector/recruitment-concept-illustration_114360-516.jpg
" // use illustration / image like reference
        alt="Discover Candidates"
        className="w-full max-w-md"
      />

      <p className="mt-6 text-lg font-semibold text-[#0F2A3A] max-w-sm">
        Discover professional candidates from across pune.
      </p>
    </div>

    {/* ================= RIGHT FLOATING PANEL ================= */}
    <div className="bg-white rounded-3xl shadow-xl p-10">

      {/* Heading */}
      <div className="mb-8">
        <h2 className="text-4xl font-extrabold text-[#0F2A3A]">
          NMK in Numbers
        </h2>
        <p className="mt-3 text-[#6B7C87] max-w-xl">
          Building trust through verified opportunities, guidance, and
          statewide support for job seekers.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">

        <div className="border rounded-xl p-5 hover:shadow-md transition">
          <p className="text-3xl font-extrabold text-[#4F8F9D]">2M+</p>
          <p className="mt-1 font-medium text-[#0F2A3A]">Users Served</p>
        </div>

        <div className="border rounded-xl p-5 hover:shadow-md transition">
          <p className="text-3xl font-extrabold text-[#0F2A3A]">10K+</p>
          <p className="mt-1 font-medium text-[#0F2A3A]">
            Govt Jobs Posted
          </p>
        </div>

        <div className="border rounded-xl p-5 hover:shadow-md transition">
          <p className="text-3xl font-extrabold text-[#4F8F9D]">500+</p>
          <p className="mt-1 font-medium text-[#0F2A3A]">Help Centers</p>
        </div>

        <div className="border rounded-xl p-5 hover:shadow-md transition">
          <p className="text-3xl font-extrabold text-[#0F2A3A]">
            4.5<span className="text-[#4F8F9D]">★</span>
          </p>
          <p className="mt-1 font-medium text-[#0F2A3A]">
            User Rating
          </p>
        </div>
      </div>

      {/* Slider Dots (visual like reference) */}
      <div className="flex justify-center gap-2 mt-8">
        <span className="w-3 h-3 rounded-full bg-[#4F8F9D]"></span>
        <span className="w-3 h-3 rounded-full bg-[#CBD5E1]"></span>
        <span className="w-3 h-3 rounded-full bg-[#CBD5E1]"></span>
      </div>
    </div>
  </div>
</section>

      {/* AGE MODAL */}
      <AgeCalculatorModal
        isOpen={openAgeModal}
        onClose={() => setOpenAgeModal(false)}
      />
    </div>
  );
}
