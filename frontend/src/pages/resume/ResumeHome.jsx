import { useState } from "react";
import templates from "../../data/resumeTemplates.json";
import { useNavigate } from "react-router-dom";

export default function ResumeHome() {
  const navigate = useNavigate();

  const categories = ["All", "Simple", "Professional", "Creative"];
  const [filter, setFilter] = useState("All");

  // Modal state
  const [showModal, setShowModal] = useState(false);
  const [pendingTemplate, setPendingTemplate] = useState(null);

  const isLoggedIn = !!localStorage.getItem("nmk_user_token");

  const filteredTemplates =
    filter === "All"
      ? templates
      : templates.filter((t) => t.category === filter);

  const handleUseTemplate = (id) => {
    if (!isLoggedIn) {
      setPendingTemplate(id);
      setShowModal(true);
      return;
    }

    navigate(`/resume/build/${id}`);
  };

  const continueLogin = () => {
    setShowModal(false);
    navigate("/login", { state: { from: `/resume/build/${pendingTemplate}` } });
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Choose a Resume Template</h1>

      {/* Filter Tabs */}
      <div className="flex gap-3 overflow-x-auto pb-2">
        {categories.map((cat) => (
          <button
            key={cat}
            className={`px-4 py-2 rounded border whitespace-nowrap ${
              filter === cat
                ? "bg-blue-600 text-white border-blue-600"
                : "bg-white border-gray-300"
            }`}
            onClick={() => setFilter(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Template Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {filteredTemplates.map((temp) => (
          <div
            key={temp.id}
            className="border rounded-lg shadow-sm bg-white p-4 flex flex-col hover:shadow-lg hover:-translate-y-1 transition-all"
          >
            <div className="relative">
              <img
                src={temp.thumbnail}
                alt={temp.name}
                className="w-full rounded mb-3 object-contain aspect-[3/4] bg-gray-100 p-2"
              />

              {/* Lock icon when logged out */}
              {!isLoggedIn && (
                <div className="absolute top-2 right-2 bg-black/60 text-white text-xs px-2 py-1 rounded">
                  🔒 Login Required
                </div>
              )}
            </div>

            <h2 className="text-lg font-semibold">{temp.name}</h2>
            <p className="text-sm text-gray-600">{temp.category} Template</p>

            <button
              onClick={() => handleUseTemplate(temp.id)}
              className={`mt-4 px-4 py-2 rounded text-center ${
                isLoggedIn
                  ? "bg-blue-600 text-white hover:bg-blue-700"
                  : "bg-gray-300 text-gray-600 cursor-not-allowed"
              }`}
            >
              {isLoggedIn ? "Use Template" : "Login Required"}
            </button>
          </div>
        ))}
      </div>

      {/* Login Required Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-sm shadow-xl">
            <h2 className="text-xl font-semibold mb-3 text-center">
              Login Required
            </h2>

            <p className="text-gray-700 text-center mb-5">
              You need to login to use this resume template.
            </p>

            <div className="flex justify-center gap-3">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 bg-gray-300 rounded"
              >
                Cancel
              </button>
              <button
                onClick={continueLogin}
                className="px-4 py-2 bg-blue-600 text-white rounded"
              >
                Login
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
