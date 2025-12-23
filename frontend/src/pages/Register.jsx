import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const INDIAN_STATES = [
  "Andhra Pradesh","Arunachal Pradesh","Assam","Bihar","Chhattisgarh","Goa",
  "Gujarat","Haryana","Himachal Pradesh","Jharkhand","Karnataka","Kerala",
  "Madhya Pradesh","Maharashtra","Manipur","Meghalaya","Mizoram","Nagaland",
  "Odisha","Punjab","Rajasthan","Sikkim","Tamil Nadu","Telangana","Tripura",
  "Uttar Pradesh","Uttarakhand","West Bengal",
];

export default function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    mobile: "",
    password: "",
    department: "",
    state: "",
    city: ""
  });

  const [stateSearch, setStateSearch] = useState("");
  const [showStates, setShowStates] = useState(false);
  const [loading, setLoading] = useState(false);

  const filteredStates = INDIAN_STATES.filter(s =>
    s.toLowerCase().includes(stateSearch.toLowerCase())
  );

  const handleChange = e =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const selectState = state => {
    setForm({ ...form, state });
    setStateSearch(state);
    setShowStates(false);
  };

  const handleSubmit = async e => {
    e.preventDefault();

    if (!form.name || !form.email || !form.password || !form.mobile) {
      return alert("All required fields are mandatory");
    }
    if (!/^\S+@\S+\.\S+$/.test(form.email)) return alert("Invalid email");
    if (!/^[6-9]\d{9}$/.test(form.mobile)) return alert("Enter valid 10-digit mobile number");
    if (form.password.length < 6) return alert("Password must be at least 6 characters");

    try {
      setLoading(true);

      const payload = {
        name: form.name,
        email: form.email,
        mobile: form.mobile,
        password: form.password,
        department: form.department,
        address: {
          state: form.state,
          city: form.city
        }
      };

      await axios.post("http://localhost:5000/api/users/register", payload);

      alert("Registration successful");
      setForm({
        name: "",
        email: "",
        mobile: "",
        password: "",
        department: "",
        state: "",
        city: ""
      });
      setStateSearch("");
      navigate("/login");
    } catch (err) {
      alert(err.response?.data?.msg || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="w-full min-h-screen flex items-center justify-center relative"
      style={{
        backgroundImage: "url('https://images.pexels.com/photos/5380642/pexels-photo-5380642.jpeg?auto=compress&cs=tinysrgb&w=1600')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        minHeight: "100vh"
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/50"></div>

      {/* Card */}
      <div className="relative z-10 w-full max-w-lg bg-white rounded-xl shadow-2xl p-10 animate-fadeInUp
                      sm:max-w-md sm:p-6">
        <h1 className="text-2xl font-bold text-center text-gray-900 mb-2">
          NMK Career Portal
        </h1>
        <p className="text-center text-gray-500 mb-6">
          Create your account
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            name="name"
            placeholder="Full Name"
            value={form.name}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <input
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <input
            name="mobile"
            placeholder="Mobile Number"
            value={form.mobile}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <input
            name="password"
            type="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <input
            name="department"
            placeholder="Department"
            value={form.department}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          {/* State search */}
          <div className="relative">
            <input
              placeholder="Search State"
              value={stateSearch}
              onChange={e => {
                setStateSearch(e.target.value);
                setShowStates(true);
              }}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {showStates && filteredStates.length > 0 && (
              <div className="absolute top-full left-0 w-full bg-white border rounded max-h-32 overflow-y-auto z-10">
                {filteredStates.map((s, i) => (
                  <div
                    key={i}
                    onClick={() => selectState(s)}
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                  >
                    {s}
                  </div>
                ))}
              </div>
            )}
          </div>

          <input
            name="city"
            placeholder="City"
            value={form.city}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            {loading ? "Registering..." : "Register"}
          </button>
        </form>

        <p className="text-center text-gray-500 mt-4">
          Already have an account?{" "}
          <span
            onClick={() => navigate("/login")}
            className="text-blue-500 cursor-pointer hover:underline"
          >
            Login
          </span>
        </p>
      </div>

      {/* Tailwind Animation */}
      <style>{`
        @keyframes fadeInUp {
          0% { opacity: 0; transform: translateY(20px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeInUp {
          animation: fadeInUp 0.5s ease forwards;
        }
      `}</style>
    </div>
  );
}
