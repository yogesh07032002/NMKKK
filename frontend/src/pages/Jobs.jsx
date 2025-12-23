import React, { useEffect, useState, useMemo } from "react";
import { Link, useLocation } from "react-router-dom";
import api from "../utils/api";
import {
  ChevronDownIcon,
  MagnifyingGlassIcon,
  FunnelIcon,
} from "@heroicons/react/24/outline";

export default function Jobs() {
  const location = useLocation();

  // If user came from Eligibility Checker
  const eligibleJobs = location.state?.eligibleJobs || null;

  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  // Filters
  const [search, setSearch] = useState("");
  const [qualification, setQualification] = useState("All");
  const [locationFilter, setLocationFilter] = useState("All");

  // NEW TYPE FILTER
  const [typeFilter, setTypeFilter] = useState("All");

  const [sortBy, setSortBy] = useState("latest");

  // Accordion state
  const [openAccordion, setOpenAccordion] = useState(false);

  /* ----------------------------------------------
   LOAD JOBS (SHOW ONLY ACTIVE JOBS)
---------------------------------------------- */
  useEffect(() => {
    let mounted = true;

    const loadJobs = async () => {
      try {
        setLoading(true);

        if (eligibleJobs) {
          if (mounted) setJobs(eligibleJobs);
        } else {
          const res = await api.get("/jobs");

          const activeOnly = (res.data || []).filter(
            (j) => j.status === "active"
          );

          if (mounted) setJobs(activeOnly);
        }
      } catch (err) {
        console.error("Error loading jobs:", err);
      } finally {
        if (mounted) setLoading(false);
      }
    };

    loadJobs();
    const interval = setInterval(loadJobs, 60000);
    return () => {
      clearInterval(interval);
      mounted = false;
    };
  }, [eligibleJobs]);

  /* ----------------------------------------------
     UNIQUE FILTER OPTIONS
  ---------------------------------------------- */
  const uniqueQualifications = useMemo(() => {
    const q = jobs.map((j) => j.qualification).filter(Boolean);
    return ["All", ...new Set(q)];
  }, [jobs]);

  const uniqueLocations = useMemo(() => {
    const loc = jobs.map((j) => j.location).filter(Boolean);
    return ["All", ...new Set(loc)];
  }, [jobs]);

  // NEW: UNIQUE TYPES
  const uniqueTypes = useMemo(() => {
    const t = jobs.map((j) => j.type).filter(Boolean);
    return ["All", ...new Set(t)];
  }, [jobs]);

  /* ----------------------------------------------
     FILTERING + SORTING
  ---------------------------------------------- */
  const filteredJobs = useMemo(() => {
    let list = [...jobs];
    const s = search.toLowerCase();

    // Search
    if (search.trim() !== "") {
      list = list.filter(
        (job) =>
          job.title.toLowerCase().includes(s) ||
          job.organization.toLowerCase().includes(s) ||
          (job.location && job.location.toLowerCase().includes(s)) ||
          (job.qualification && job.qualification.toLowerCase().includes(s))
      );
    }

    // Qualification filter
    if (qualification !== "All") {
      list = list.filter((job) => job.qualification === qualification);
    }

    // Location filter
    if (locationFilter !== "All") {
      list = list.filter((job) => job.location === locationFilter);
    }

    // NEW: Type filter
    if (typeFilter !== "All") {
      list = list.filter((job) => job.type === typeFilter);
    }

    // Sorting
    list.sort((a, b) => {
      if (sortBy === "latest")
        return new Date(b.createdAt) - new Date(a.createdAt);

      if (sortBy === "oldest")
        return new Date(a.createdAt) - new Date(b.createdAt);

      if (sortBy === "lastDateNear")
        return new Date(a.lastDate) - new Date(b.lastDate);

      if (sortBy === "lastDateFar")
        return new Date(b.lastDate) - new Date(a.lastDate);

      return 0;
    });

    return list;
  }, [jobs, search, qualification, locationFilter, typeFilter, sortBy]);

  /* ----------------------------------------------
     LOADING
  ---------------------------------------------- */
  if (loading)
    return <div className="text-center py-10 text-lg">Loading jobs…</div>;

  return (
    
  
    <>
      {/* ================= TOP JOB OVERVIEW SECTION ================= */}
      <section className="bg-[#F6F9FB] border-b">
  <div className="max-w-7xl mx-auto px-4 py-16 grid lg:grid-cols-3 gap-12">

    {/* LEFT CONTENT */}
    <div className="lg:col-span-2">
      <h2 className="text-4xl font-extrabold text-[#0F2A3A] leading-tight">
        NMK Career & Job Guidance Portal
      </h2>

      <p className="mt-5 text-[#6B7C87] max-w-2xl leading-relaxed">
        NMK Career & Job Guidance Portal is a trusted platform dedicated to
        providing verified government job notifications, career guidance,
        and employment updates for students, job seekers, and aspirants
        across Maharashtra and India.
      </p>

      {/* KEY POINTS */}
      <div className="mt-8 grid sm:grid-cols-2 gap-y-4 gap-x-10 text-sm">
        <div className="flex gap-3">
          <span className="text-[#4F8F9D] font-bold">✔</span>
          <span>Verified government job notifications</span>
        </div>
        <div className="flex gap-3">
          <span className="text-[#4F8F9D] font-bold">✔</span>
          <span>Regular updates from official sources</span>
        </div>
        <div className="flex gap-3">
          <span className="text-[#4F8F9D] font-bold">✔</span>
          <span>Clear eligibility, qualification & age criteria</span>
        </div>
        <div className="flex gap-3">
          <span className="text-[#4F8F9D] font-bold">✔</span>
          <span>Accurate last dates & application information</span>
        </div>
      </div>
    </div>

    {/* RIGHT INFO STRIP */}
    <div className="relative">
      <div className="absolute -inset-3 bg-[#4F8F9D]/10 blur-2xl rounded-3xl"></div>

      <div className="relative bg-white border-l-4 border-[#4F8F9D] rounded-xl p-6">
        <p className="text-xs uppercase tracking-wide text-[#6B7C87]">
          What NMK Provides
        </p>

        <ul className="mt-4 space-y-2 text-sm text-[#0F2A3A]">
          <li>• Central & State Government Jobs</li>
          <li>• Maharashtra Government Vacancies</li>
          <li>• PSU, Board & Corporation Jobs</li>
          <li>• Exam Notifications & Results</li>
          <li>• Career Guidance & Preparation Support</li>
        </ul>
      </div>
    </div>

  </div>
</section>


      {/* ================= MAIN LAYOUT ================= */}
      <div className="bg-[#F6F9FB]">
  <div className="max-w-7xl mx-auto px-4 py-12 space-y-10">

    {/* ================= TOP INFO STRIP ================= */}
    <div className="bg-white rounded-2xl border shadow-sm p-8 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
      <div>
        <h1 className="text-3xl font-extrabold text-[#0F2A3A]">
          Job Notifications & Career Opportunities
        </h1>
        <p className="mt-2 text-[#6B7C87] max-w-2xl text-sm leading-relaxed">
          Explore verified government job notifications, eligibility details,
          and official application deadlines curated by NMK Career & Job
          Guidance Portal.
        </p>
      </div>

      {/* SEARCH */}
      <div className="w-full lg:w-96">
        <div className="flex items-center bg-[#F6F9FB] border rounded-xl px-4 py-3">
          <MagnifyingGlassIcon className="w-5 h-5 text-gray-500" />
          <input
            type="text"
            placeholder="Search by post, department, exam..."
            className="ml-3 w-full bg-transparent outline-none text-sm"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>
    </div>

    {/* ================= MAIN LAYOUT ================= */}
    <div className="grid lg:grid-cols-[300px_1fr] gap-8">

      {/* ================= FILTER PANEL ================= */}
      <aside className="bg-white rounded-2xl border shadow-sm p-6 h-fit sticky top-24">

        <h3 className="text-base font-bold text-[#0F2A3A] mb-6 uppercase tracking-wide">
          Filter Jobs
        </h3>

        {/* QUALIFICATION */}
        <div className="mb-7">
          <p className="text-sm font-semibold mb-3 text-gray-700">
            Qualification
          </p>
          <div className="flex flex-wrap gap-2">
            {uniqueQualifications.map((q) => (
              <button
                key={q}
                onClick={() => setQualification(q)}
                className={`px-3 py-1.5 text-xs rounded-lg border transition ${
                  qualification === q
                    ? "bg-[#0F2A3A] text-white border-[#0F2A3A]"
                    : "bg-[#F6F9FB] text-gray-700 hover:bg-white"
                }`}
              >
                {q}
              </button>
            ))}
          </div>
        </div>

        {/* LOCATION */}
        <div className="mb-7">
          <p className="text-sm font-semibold mb-3 text-gray-700">
            Location
          </p>
          <div className="flex flex-wrap gap-2">
            {uniqueLocations.map((l) => (
              <button
                key={l}
                onClick={() => setLocationFilter(l)}
                className={`px-3 py-1.5 text-xs rounded-lg border transition ${
                  locationFilter === l
                    ? "bg-[#4F8F9D] text-white border-[#4F8F9D]"
                    : "bg-[#F6F9FB] text-gray-700 hover:bg-white"
                }`}
              >
                {l}
              </button>
            ))}
          </div>
        </div>

        {/* JOB TYPE */}
        <div className="mb-7">
          <p className="text-sm font-semibold mb-3 text-gray-700">
            Job Type
          </p>
          <div className="flex flex-wrap gap-2">
            {uniqueTypes.map((t) => (
              <button
                key={t}
                onClick={() => setTypeFilter(t)}
                className={`px-3 py-1.5 text-xs rounded-lg border transition ${
                  typeFilter === t
                    ? "bg-[#4F8F9D] text-white border-[#4F8F9D]"
                    : "bg-[#F6F9FB] text-gray-700 hover:bg-white"
                }`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        {/* SORT */}
        <div>
          <p className="text-sm font-semibold mb-3 text-gray-700">
            Sort Results
          </p>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="w-full border rounded-xl px-3 py-2 text-sm bg-[#F6F9FB]"
          >
            <option value="latest">Newest First</option>
            <option value="oldest">Oldest First</option>
            <option value="lastDateNear">Last Date Near</option>
            <option value="lastDateFar">Last Date Far</option>
          </select>
        </div>
      </aside>

      {/* ================= JOB LIST ================= */}
      <section className="space-y-4">

        {filteredJobs.length === 0 ? (
          <div className="bg-white rounded-2xl p-10 text-center text-gray-600 border">
            No job notifications available.
          </div>
        ) : (
          filteredJobs.map((job) => (
            <div
              key={job._id}
              className="bg-white rounded-2xl border shadow-sm p-6 hover:border-[#4F8F9D] transition"
            >
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">

                {/* LEFT */}
                <div>
                  <h3 className="text-lg font-bold text-[#0F2A3A]">
                    {job.title}
                  </h3>
                  <p className="text-sm text-gray-600 mt-1">
                    {job.organization}
                  </p>

                  <div className="mt-4 flex flex-wrap gap-3 text-xs">
                    <span className="px-3 py-1 rounded-full bg-[#F6F9FB]">
                      📍 {job.location || "N/A"}
                    </span>
                    <span className="px-3 py-1 rounded-full bg-[#F6F9FB]">
                      🎓 {job.qualification || "N/A"}
                    </span>
                    <span className="px-3 py-1 rounded-full bg-[#F6F9FB]">
                      💼 {job.type || "N/A"}
                    </span>
                  </div>
                </div>

                {/* RIGHT */}
                <div className="text-right">
                  <p className="text-sm font-semibold text-red-600">
                    Last Date:{" "}
                    {job.lastDate
                      ? new Date(job.lastDate).toLocaleDateString()
                      : "—"}
                  </p>

                  <Link
                    to={`/jobs/${job._id}`}
                    className="inline-block mt-4 px-6 py-2.5 text-sm font-semibold rounded-xl bg-[#0F2A3A] text-white hover:bg-[#163C52] transition"
                  >
                    View Official Details
                  </Link>
                </div>
              </div>
            </div>
          ))
        )}
      </section>
    </div>
  </div>
</div>

    </>
  

  );
}
