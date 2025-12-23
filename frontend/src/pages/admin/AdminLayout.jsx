import { Outlet, Link, useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../../utils/api";
import {
  HomeIcon,
  BriefcaseIcon,
  PlusCircleIcon,
  BellAlertIcon,
  VideoCameraIcon,
  MapPinIcon,
  Cog6ToothIcon,
  ArrowLeftOnRectangleIcon,
  RectangleStackIcon,   // <-- ADDED THIS FOR POSTERS
} from "@heroicons/react/24/outline";
import { FaRegUser } from "react-icons/fa6";

export default function AdminLayout() {
  const navigate = useNavigate();
  const location = useLocation();

  const [admin, setAdmin] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const loadAdmin = () => {
    api
      .get("/auth/me")
      .then((res) => {
        if (res.data.role !== "admin") throw new Error("Not admin");
        setAdmin(res.data);
      })
      .catch(() => {
        localStorage.removeItem("nmk_admin_token");
        navigate("/admin/login");
      });
  };

  useEffect(() => {
    loadAdmin();
  }, []);

  useEffect(() => {
    const refresh = () => loadAdmin();
    window.addEventListener("storage", refresh);
    return () => window.removeEventListener("storage", refresh);
  }, []);

  const logout = () => {
    localStorage.removeItem("nmk_admin_token");
    localStorage.removeItem("nmk_admin");
    navigate("/admin/login");
  };

  const isActive = (path) =>
    location.pathname.startsWith(path)
      ? "bg-blue-600 text-white shadow"
      : "hover:bg-blue-50 text-gray-700";

  return (
    <div className="min-h-screen flex bg-gray-50">
      {/* SIDEBAR */}
      <aside
        className={`${
          sidebarOpen ? "w-64" : "w-20"
        } bg-white border-r shadow-sm transition-all duration-200 p-4 flex flex-col`}
      >
        <div className="flex items-center justify-between mb-6">
          <h1
            className={`text-xl font-bold text-blue-700 transition-opacity ${
              sidebarOpen ? "opacity-100" : "opacity-0 hidden"
            }`}
          >
            Admin Panel
          </h1>

          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 border rounded-lg hover:bg-gray-100"
          >
            {sidebarOpen ? "←" : "→"}
          </button>
        </div>

        {/* ADMIN PROFILE */}
        <div className="flex items-center gap-3 mb-8 px-2">
          {admin?.profilePic ? (
            <img
              src={`${import.meta.env.VITE_API_BASE}${admin.profilePic}`}
              className="w-12 h-12 rounded-full object-cover shadow"
            />
          ) : (
            <div className="w-12 h-12 rounded-full bg-blue-600 text-white flex items-center justify-center text-xl font-bold shadow">
              {admin?.name?.charAt(0)}
            </div>
          )}

          {sidebarOpen && (
            <div>
              <p className="font-semibold">{admin?.name}</p>
              <p className="text-sm text-gray-500">Administrator</p>
            </div>
          )}
        </div>

        {/* NAVIGATION */}
        <nav className="flex-1 space-y-1">
          <Link
            className={`flex items-center gap-3 p-3 rounded-lg font-medium ${isActive(
              "/admin/dashboard"
            )}`}
            to="/admin/dashboard"
          >
            <HomeIcon className="w-6" />
            {sidebarOpen && "Dashboard"}
          </Link>

          <Link
            className={`flex items-center gap-3 p-3 rounded-lg font-medium ${isActive(
              "/admin/jobs"
            )}`}
            to="/admin/jobs"
          >
            <BriefcaseIcon className="w-6" />
            {sidebarOpen && "Manage Jobs"}
          </Link>

          <Link
            className={`flex items-center gap-3 p-3 rounded-lg font-medium ${isActive(
              "/admin/add-job"
            )}`}
            to="/admin/add-job"
          >
            <PlusCircleIcon className="w-6" />
            {sidebarOpen && "Add Job"}
          </Link>
          <Link
            className={`flex items-center gap-3 p-3 rounded-lg font-medium ${isActive(
              "/admin/user"
            )}`}
            to="/admin/user"
          >
            <FaRegUser className="w-6" />
            {sidebarOpen && "User Data"}
          </Link>

          <Link
            className={`flex items-center gap-3 p-3 rounded-lg font-medium ${isActive(
              "/admin/notifications"
            )}`}
            to="/admin/notifications"
          >
            <BellAlertIcon className="w-6" />
            {sidebarOpen && "Notifications"}
          </Link>

          <Link
            className={`flex items-center gap-3 p-3 rounded-lg font-medium ${isActive(
              "/admin/videos"
            )}`}
            to="/admin/videos"
          >
            <VideoCameraIcon className="w-6" />
            {sidebarOpen && "Guidance Videos"}
          </Link>

          <Link
            className={`flex items-center gap-3 p-3 rounded-lg font-medium ${isActive(
              "/admin/centers"
            )}`}
            to="/admin/centers"
          >
            <MapPinIcon className="w-6" />
            {sidebarOpen && "Help Centers"}
          </Link>

          {/* 🔄 UPDATED ICON HERE — RectangleStackIcon FOR POSTERS */}
          <Link
            className={`flex items-center gap-3 p-3 rounded-lg font-medium ${isActive(
              "/admin/poster"
            )}`}
            to="/admin/poster"
          >
            <RectangleStackIcon className="w-6" />
            {sidebarOpen && "Homepage Poster"}
          </Link>

          <Link
            className={`flex items-center gap-3 p-3 rounded-lg font-medium ${isActive(
              "/admin/settings"
            )}`}
            to="/admin/settings"
          >
            <Cog6ToothIcon className="w-6" />
            {sidebarOpen && "Settings"}
          </Link>
        </nav>

        <button
          onClick={logout}
          className="flex items-center gap-3 p-3 rounded-lg font-semibold text-red-600 hover:bg-red-50 mt-4"
        >
          <ArrowLeftOnRectangleIcon className="w-6" />
          {sidebarOpen && "Logout"}
        </button>
      </aside>

      {/* MAIN */}
      <main className="flex-1 p-6 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
}
