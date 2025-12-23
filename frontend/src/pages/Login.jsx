import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import api from "../utils/api";
import { motion } from "framer-motion";

export default function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const redirectTo = location.state?.from || "/";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErr("");

    try {
      const res = await api.post("/auth/login", { email, password });
      localStorage.setItem("nmk_user_token", res.data.token);

      const me = await api.get("/auth/me");
      localStorage.setItem("nmk_user", JSON.stringify(me.data));

      window.dispatchEvent(new Event("storage"));
      navigate(redirectTo);
    } catch (error) {
      setErr(error.response?.data?.msg || "Invalid email or password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen relative flex items-center justify-center overflow-hidden">

      {/* BACKGROUND IMAGE */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://images.pexels.com/photos/5380642/pexels-photo-5380642.jpeg?auto=compress&cs=tinysrgb&w=1600')",
        }}
      />

      {/* LIGHT OVERLAY */}
      <div className="absolute inset-0 bg-white/70"></div>

      {/* FORM */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 w-full max-w-md bg-white rounded-2xl shadow-2xl p-8 md:p-10 mx-4"
      >
        <h1 className="text-3xl font-bold text-center text-[#0F2A3A] mb-2">
          NMK Career Portal
        </h1>

        <p className="text-center text-sm text-gray-500 mb-6">
          Login to your account
        </p>

        {err && (
          <div className="bg-red-50 text-red-700 p-3 rounded-lg mb-4 text-center text-sm">
            {err}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full border rounded-lg px-4 py-3 focus:ring-2 focus:ring-[#4F8F9D] outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full border rounded-lg px-4 py-3 focus:ring-2 focus:ring-[#4F8F9D] outline-none"
            />
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            disabled={loading}
            className="w-full py-3 rounded-lg bg-[#0F2A3A] text-white font-semibold shadow-md"
          >
            {loading ? "Signing in..." : "Login"}
          </motion.button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-600">
          Don’t have an account?{" "}
          <Link to="/register" className="text-[#4F8F9D] font-semibold">
            Register
          </Link>
        </p>
      </motion.div>
    </div>
  );
}
