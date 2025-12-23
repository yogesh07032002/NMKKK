// src/pages/admin/AdminDashboard.jsx

import React, { useEffect, useState } from "react";
import api from "../../utils/api";
import { Link } from "react-router-dom";

import {
  BriefcaseIcon,
  CheckCircleIcon,
  BellAlertIcon,
  VideoCameraIcon,
  MapPinIcon,
  PhotoIcon,
  PlusCircleIcon,
  RectangleStackIcon,
} from "@heroicons/react/24/outline";
import { LuUsers } from "react-icons/lu";
export default function AdminDashboard() {
  const [stats, setStats] = useState({
    totalJobs: 0,
    notifications: 0,
    videos: 0,
    centers: 0,
    users: 0,
    poster: false,

  });

  useEffect(() => {
    const loadStats = async () => {
      try {

        const jobRes = await api.get("/jobs?limit=2000");
        const jobs = jobRes.data || [];

        const notifRes = await api.get("/notifications/active");
        const notifications = notifRes.data?.length || 0;

        const vidRes = await api.get("/videos");
        const videos = vidRes.data?.length || 0;

        const centerRes = await api.get("/centers");
        const centers = centerRes.data?.length || 0;

        const usersRes = await api.get("/auth/get-list");
        const users = usersRes.data?.data?.length || 0;

        const posterRes = await api.get("/posters");
        const posterExists = Array.isArray(posterRes.data) && posterRes.data.length > 0;

        setStats({
          totalJobs: jobs.length,
          notifications,
          videos,
          centers,
          users,
          poster: posterExists,
        });
      } catch (err) {
        console.error("Dashboard stats error:", err);
      }
    };

    loadStats();
  }, []);

  const StatCard = ({ title, value, icon: Icon, color }) => (
    <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-gray-500 text-xs">{title}</p>
          <p className={`text-2xl font-semibold mt-1 ${color}`}>{value}</p>
        </div>
        <Icon className="w-8 h-8 text-gray-400" />
      </div>
    </div>
  );

  return (
    <div className="space-y-10">

      <div className="flex justify-between items-center">
        <h1 className="text-xl md:text-2xl font-semibold text-gray-800">
          Admin Dashboard
        </h1>

        <Link
          to="/admin/add-job"
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-700 transition text-sm"
        >
          <PlusCircleIcon className="w-5" />
          Add Job
        </Link>
      </div>

      {/* STATS GRID */}
      <div className="grid gap-4 md:grid-cols-3">
        <StatCard
          title="Total Jobs"
          value={stats.totalJobs}
          icon={BriefcaseIcon}
          color="text-blue-600"
        />
        <StatCard
          title="Active Notifications"
          value={stats.notifications}
          icon={BellAlertIcon}
          color="text-indigo-600"
        />
        <StatCard
          title="Guidance Videos"
          value={stats.videos}
          icon={VideoCameraIcon}
          color="text-purple-600"
        />
        <StatCard
          title="Help Centers"
          value={stats.centers}
          icon={MapPinIcon}
          color="text-yellow-600"
        />
        <StatCard
          title="Users"
          value={stats.users}
          icon={LuUsers}
          color="text-yellow-600"
        />
      </div>

      {/* POSTER STATUS */}
      <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="flex items-center gap-4">
          {/* 🔄 UPDATED ICON HERE */}
          <RectangleStackIcon className="w-12 h-12 text-blue-600" />

          <div>
            <h3 className="text-lg font-semibold text-gray-800">Homepage Poster</h3>
            <p className="text-gray-600 text-sm">
              {stats.poster
                ? "A poster is active on the homepage."
                : "No poster uploaded yet."}
            </p>
          </div>
        </div>

        <Link
          to="/admin/poster"
          className="bg-blue-600 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-700 transition text-sm self-start md:self-auto"
        >
          Manage Poster
        </Link>
      </div>

      {/* QUICK ACTIONS */}
      <div>
        <h2 className="text-lg font-semibold mb-3 text-gray-800">Quick Actions</h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Link
            to="/admin/jobs"
            className="p-4 bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition text-center text-sm font-medium"
          >
            Manage Jobs
          </Link>
          <Link
            to="/admin/notifications"
            className="p-4 bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition text-center text-sm font-medium"
          >
            Notifications
          </Link>
          <Link
            to="/admin/videos"
            className="p-4 bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition text-center text-sm font-medium"
          >
            Guidance Videos
          </Link>
          <Link
            to="/admin/centers"
            className="p-4 bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition text-center text-sm font-medium"
          >
            Help Centers
          </Link>
        </div>
      </div>
    </div>
  );
}
