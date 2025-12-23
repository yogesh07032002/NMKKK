import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../utils/api";

export default function AdminLogin() {
  const [email, setEmail] = useState("admin@nmk.com");
  const [password, setPassword] = useState("Admin@123");
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    setErr("");
    setLoading(true);

    try {
      const res = await api.post("/auth/admin/login", { email, password });

      // store admin token ONLY
      localStorage.setItem("nmk_admin_token", res.data.token);

      // optional: store admin info
      localStorage.setItem("nmk_admin", JSON.stringify(res.data.user));

      alert("Login successful!");
      navigate("/admin/dashboard");   // guaranteed to work now
    } catch (error) {
      setErr(error.response?.data?.msg || "Login failed");
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow p-6">
        <h2 className="text-2xl font-bold mb-4 text-center">Admin Login</h2>

        {err && (
          <div className="bg-red-50 text-red-700 p-2 rounded mb-3">
            {err}
          </div>
        )}

        <form onSubmit={submit} className="space-y-3">
          <input
            type="email"
            className="w-full border px-3 py-2 rounded"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            className="w-full border px-3 py-2 rounded"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded font-semibold"
            disabled={loading}
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>
      </div>
    </div>
  );
}
