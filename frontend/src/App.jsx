import { BrowserRouter, Routes, Route } from "react-router-dom";

// Layout
import MainLayout from "./layouts/MainLayout";

// User Pages
import Home from "./pages/Home";
import Jobs from "./pages/Jobs";
import JobDetails from "./pages/JobDetails";
import ResumeLanding from "./pages/resume/ResumeLanding";
import ResumeHome from "./pages/resume/ResumeHome";
import ResumeForm from "./pages/resume/ResumeForm";
import ResumePreview from "./pages/resume/ResumePreview";
import HelpCenters from "./pages/HelpCenters";
import About from "./pages/About";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Contact from "./pages/Contact";


// Admin Pages
import AdminLogin from "./pages/admin/AdminLogin";
import AdminLayout from "./pages/admin/AdminLayout";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminSettings from "./pages/admin/AdminSettings";
import AdminJobs from "./pages/admin/AdminJobs";
import AdminAddJob from "./pages/admin/AdminAddJob";
import AdminEditJob from "./pages/admin/AdminEditJob";
import AdminNotifications from "./pages/admin/AdminNotifications";
import AdminCenters from "./pages/admin/AdminCenters";
import AdminVideos from "./pages/admin/AdminVideos";
import AdminPoster from "./pages/admin/AdminPoster";
import AdminUser from "./pages/admin/AdminUser";


import UpgradePremium from "./pages/resume/UpgradePremium";

// Route Guards
import PrivateRoute from "./components/PrivateRoute";        // Admin
import UserPrivateRoute from "./components/UserPrivateRoute"; // User resume builder

// Extra Pages
import Placements from "./pages/Placements";
import PlacementEligibility from "./pages/PlacementEligibility";
import AgeCalculator from "./pages/AgeCalculator";
import Guidance from "./pages/Guidance";

// NEW — Global Auth Provider
import { AuthProvider } from "./context/AuthContext";

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>

          {/* ---------- USER AREA ---------- */}
          <Route element={<MainLayout />}>

            <Route path="/" element={<Home />} />

            {/* Jobs */}
            <Route path="/jobs" element={<Jobs />} />
            <Route path="/jobs/:id" element={<JobDetails />} />

            {/* Resume Landing + Browse */}
            <Route path="/resume" element={<ResumeLanding />} />
            <Route path="/resume/templates" element={<ResumeHome />} />
            <Route path="/contact" element={<Contact/>}/>

            {/* Resume Builder (Protected) */}
            <Route
                            path="/resume/build/:templateId"
                            element={
                                <UserPrivateRoute>
                                    <ResumeForm />
                                </UserPrivateRoute>
                            }
                        />


             <Route
                            path="/resume/preview/:templateId"
                            element={
                                <UserPrivateRoute>
                                    <ResumePreview />
                                </UserPrivateRoute>
                            }
                        />

                        {/* ⭐ NEW ROUTE FOR PREMIUM UPGRADE/PRICING ⭐ */}
                        <Route path="/upgrade-premium" element={<UpgradePremium />} />

            {/* Misc */}
            <Route path="/placements" element={<Placements />} />
            <Route path="/placements/eligibility" element={<PlacementEligibility />} />
            <Route path="/age-calculator" element={<AgeCalculator />} />
            <Route path="/guidance" element={<Guidance />} />

            {/* Help Centers */}
            <Route path="/help-centers" element={<HelpCenters />} />
            <Route path="/about" element={<About />} />

            {/* Authentication */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

          </Route>

          {/* ---------- ADMIN AREA ---------- */}
          <Route path="/admin/login" element={<AdminLogin />} />

          <Route
            path="/admin"
            element={
              <PrivateRoute>
                <AdminLayout />
              </PrivateRoute>
            }
          >
            <Route path="dashboard" element={<AdminDashboard />} />
            <Route path="settings" element={<AdminSettings />} />
            <Route path="jobs" element={<AdminJobs />} />
            <Route path="add-job" element={<AdminAddJob />} />
            <Route path="edit-job/:id" element={<AdminEditJob />} />
            <Route path="notifications" element={<AdminNotifications />} />
            <Route path="videos" element={<AdminVideos />} />
            <Route path="poster" element={<AdminPoster />} />
            <Route path="centers" element={<AdminCenters />} />
            <Route path="user" element={<AdminUser />} />

            {/* default admin page */}
            <Route index element={<AdminDashboard />} />
          </Route>

        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
