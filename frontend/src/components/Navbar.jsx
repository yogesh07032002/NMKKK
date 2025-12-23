import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { HiMenu, HiX, HiUserCircle } from "react-icons/hi";

export default function Navbar() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handlelogout = () => {
    localStorage.removeItem("token");
  }
  // Load user reactively
  useEffect(() => {
    const load = () => {
      const stored = localStorage.getItem("nmk_user");
      setUser(stored ? JSON.parse(stored) : null);
    };

    load();
    window.addEventListener("storage", load);
    return () => window.removeEventListener("storage", load);
  }, []);

  const logout = () => {
    localStorage.removeItem("nmk_user_token");
    localStorage.removeItem("nmk_user");

    window.dispatchEvent(new Event("storage"));
    navigate("/");
  };

  return (
    <>
      {/* NAVBAR */}
      <nav className="sticky top-0 z-40 bg-white/90 backdrop-blur border-b border-[#E6EEF3]">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

          {/* LOGO */}
          <h1
            className="font-extrabold text-2xl tracking-wide text-[#0F2A3A] cursor-pointer"
            onClick={() => navigate("/")}
          >
            NMK
          </h1>

          {/* DESKTOP MENU */}
          <div className="hidden md:flex items-center gap-8 text-sm font-semibold text-[#0F2A3A]">
            {[
              ["Home", "/"],
              ["Jobs", "/jobs"],
              ["Placements", "/placements"],
              ["About Us", "/about"],
              ["Help Centers", "/help-centers"],
              ["Contact", "/contact"],
            ].map(([label, path]) => (
              <Link
                key={label}
                to={path}
                className="relative hover:text-[#5E9AA6] transition after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-0 after:bg-[#5E9AA6] hover:after:w-full after:transition-all"
              >
                {label}
              </Link>
            ))}

            {!user && (
              <>
                <Link
                  to="/login"
                  className="px-4 py-2 rounded-lg border border-[#5E9AA6] text-[#5E9AA6] hover:bg-[#5E9AA6] hover:text-white transition"
                >
                  Login
                </Link>

                <Link
                  to="/register"
                  className="px-5 py-2 rounded-lg bg-[#0F2A3A] text-white hover:bg-[#132B3C] transition"
                >
                  Register
                </Link>
              </>
            )}

            {user && (
              <div
                onClick={() => setSidebarOpen(true)}
                className="cursor-pointer flex items-center gap-2"
              >
                {user.profilePic ? (
                  <img
                    src={user.profilePic}
                    className="w-10 h-10 rounded-full border-2 border-[#5E9AA6] object-cover"
                  />
                ) : (
                  <HiUserCircle size={40} className="text-[#5E9AA6]" />
                )}
              </div>
            )}
          </div>

          {/* MOBILE MENU BUTTON */}
          <button
            className="md:hidden text-3xl text-[#0F2A3A]"
            onClick={() => setMobileOpen(true)}
          >
            <HiMenu />
          </button>
        </div>
      </nav>

      {/* MOBILE MENU */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-50 md:hidden"
          onClick={() => setMobileOpen(false)}
        >
          <div
            className="absolute left-0 top-0 h-full w-72 bg-white p-6 shadow-xl flex flex-col gap-5"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-bold text-[#0F2A3A]">Menu</h2>
              <HiX size={26} onClick={() => setMobileOpen(false)} />
            </div>

            {[
              ["Home", "/"],
              ["Jobs", "/jobs"],
              ["About Us", "/about"],
              ["Help Centers", "/help-centers"],
            ].map(([label, path]) => (
              <Link
                key={label}
                to={path}
                onClick={() => setMobileOpen(false)}
                className="font-medium text-[#132B3C]"
              >
                {label}
              </Link>
            ))}

            {!user && (
              <>
                <Link to="/login" onClick={() => setMobileOpen(false)}>
                  Login
                </Link>
                <Link to="/register" onClick={() => setMobileOpen(false)}>
                  Register
                </Link>
              </>
            )}

            {user && (
              <button
                onClick={handlelogout}
                className="mt-6 bg-[#5E9AA6] text-white py-2 rounded-lg font-semibold"
              >
                Logout
              </button>
            )}
          </div>
        </div>
      )}

      {/* PROFILE SIDEBAR */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-50"
          onClick={() => setSidebarOpen(false)}
        >
          <div
            className="absolute right-0 top-0 w-80 h-full bg-white p-6 shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-bold text-[#0F2A3A]">
                Your Profile
              </h2>
              <HiX size={26} onClick={() => setSidebarOpen(false)} />
            </div>

            <div className="text-center">
              {user?.profilePic ? (
                <img
                  src={user.profilePic}
                  className="w-20 h-20 rounded-full mx-auto mb-3 border-2 border-[#5E9AA6]"
                />
              ) : (
                <HiUserCircle size={64} className="mx-auto mb-3 text-[#5E9AA6]" />
              )}

              <p className="font-semibold text-[#132B3C]">{user?.name}</p>
              <p className="text-sm text-[#6B7C87]">{user?.email}</p>
            </div>

            <button
              onClick={logout}
              
              className="w-full bg-[#0F2A3A] text-white py-2 rounded-lg mt-10 hover:bg-[#132B3C]"
            >
              Logout
            </button>
          </div>
        </div>
      )}
    </>
  );
}