// src/pages/PlacementEligibility.jsx
import { useState } from "react";
import api from "../utils/api";

export default function PlacementEligibility({ onResult }) {
  const [form, setForm] = useState({
    age: "",
    ssc: "",
    hsc: "",
    graduationScore: "",
    experience: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (key, value) => {
    setForm({ ...form, [key]: value });
  };

  const checkEligibility = async () => {
    setLoading(true);
    try {
      const res = await api.post("/jobs/filter", form);
      onResult(res.data); // send results back to modal
    } catch (err) {
      console.error(err);
      alert("Failed to check eligibility.");
    }
    setLoading(false);
  };

  return (
    <div
      className="relative max-w-md mx-auto p-6 bg-[#f0f7ff]/90 rounded-2xl shadow-lg overflow-hidden"
      style={{
        backgroundImage:
          "url('/placehero.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="backdrop-blur-sm p-4 rounded-xl bg-white/80">
        <h2 className="text-xl font-bold text-[#0F2A3A] mb-4 text-center">
          Check Your Eligibility
        </h2>

        {/* AGE */}
        <div className="relative mb-3">
          <input
            type="number"
            id="age"
            value={form.age}
            onChange={(e) => handleChange("age", e.target.value)}
            className="peer w-full border-b-2 border-gray-300 focus:border-[#4F8F9D] outline-none py-1.5 pr-8 bg-transparent text-sm"
            placeholder=" "
          />
          <label
            htmlFor="age"
            className="absolute left-0 top-1.5 text-gray-700 text-xs transition-all peer-placeholder-shown:top-2 peer-placeholder-shown:text-sm peer-focus:-top-2 peer-focus:text-[#0F2A3A] peer-focus:text-xs"
          >
            Your Age
          </label>
          <span className="absolute right-0 top-1.5 text-[#4F8F9D] text-base">
            🎂
          </span>
        </div>

        {/* SSC % */}
        <div className="relative mb-3">
          <input
            type="number"
            id="ssc"
            value={form.ssc}
            onChange={(e) => handleChange("ssc", e.target.value)}
            className="peer w-full border-b-2 border-gray-300 focus:border-[#4F8F9D] outline-none py-1.5 pr-8 bg-transparent text-sm"
            placeholder=" "
          />
          <label
            htmlFor="ssc"
            className="absolute left-0 top-1.5 text-gray-700 text-xs transition-all peer-placeholder-shown:top-2 peer-placeholder-shown:text-sm peer-focus:-top-2 peer-focus:text-[#0F2A3A] peer-focus:text-xs"
          >
            SSC %
          </label>
          <span className="absolute right-0 top-1.5 text-[#4F8F9D] text-base">
            📘
          </span>
        </div>

        {/* HSC % */}
        <div className="relative mb-3">
          <input
            type="number"
            id="hsc"
            value={form.hsc}
            onChange={(e) => handleChange("hsc", e.target.value)}
            className="peer w-full border-b-2 border-gray-300 focus:border-[#4F8F9D] outline-none py-1.5 pr-8 bg-transparent text-sm"
            placeholder=" "
          />
          <label
            htmlFor="hsc"
            className="absolute left-0 top-1.5 text-gray-700 text-xs transition-all peer-placeholder-shown:top-2 peer-placeholder-shown:text-sm peer-focus:-top-2 peer-focus:text-[#0F2A3A] peer-focus:text-xs"
          >
            HSC %
          </label>
          <span className="absolute right-0 top-1.5 text-[#4F8F9D] text-base">
            📗
          </span>
        </div>

        {/* Graduation % */}
        <div className="relative mb-3">
          <input
            type="number"
            id="graduationScore"
            value={form.graduationScore}
            onChange={(e) => handleChange("graduationScore", e.target.value)}
            className="peer w-full border-b-2 border-gray-300 focus:border-[#4F8F9D] outline-none py-1.5 pr-8 bg-transparent text-sm"
            placeholder=" "
          />
          <label
            htmlFor="graduationScore"
            className="absolute left-0 top-1.5 text-gray-700 text-xs transition-all peer-placeholder-shown:top-2 peer-placeholder-shown:text-sm peer-focus:-top-2 peer-focus:text-[#0F2A3A] peer-focus:text-xs"
          >
            Graduation %
          </label>
          <span className="absolute right-0 top-1.5 text-[#4F8F9D] text-base">
            🎓
          </span>
        </div>

        {/* Experience */}
        <div className="relative mb-4">
          <input
            type="number"
            id="experience"
            value={form.experience}
            onChange={(e) => handleChange("experience", e.target.value)}
            className="peer w-full border-b-2 border-gray-300 focus:border-[#4F8F9D] outline-none py-1.5 pr-8 bg-transparent text-sm"
            placeholder=" "
          />
          <label
            htmlFor="experience"
            className="absolute left-0 top-1.5 text-gray-700 text-xs transition-all peer-placeholder-shown:top-2 peer-placeholder-shown:text-sm peer-focus:-top-2 peer-focus:text-[#0F2A3A] peer-focus:text-xs"
          >
            Experience (Years)
          </label>
          <span className="absolute right-0 top-1.5 text-[#4F8F9D] text-base">
            💼
          </span>
        </div>

        {/* CHECK BUTTON */}
        <button
          className="w-full py-2.5 rounded-xl font-semibold text-white bg-gradient-to-r from-[#0F2A3A] to-[#4F8F9D] shadow hover:from-[#132B3C] hover:to-[#5E9AA6] transition"
          onClick={checkEligibility}
          disabled={loading}
        >
          {loading ? "Checking..." : "Check Eligibility"}
        </button>
      </div>
    </div>
  );
}
