// src/pages/resume/ResumeLanding.jsx
import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import templates from "../../data/resumeTemplates.json";
import FloatingShapes from "../../components/FloatingShapes";
import { useAuth } from "../../context/AuthContext";

/* ---------------------------------------------------
   PREMIUM CAROUSEL (with Browse Templates card)
--------------------------------------------------- */
function Carousel({ items, onSelectBrowse, onSelectTemplate }) {
  const [index, setIndex] = useState(0);

  // Add the browse card as the final item
  const fullItems = [
    ...items,
    { id: "browse-card", browse: true, name: "Browse Templates" },
  ];

  useEffect(() => {
    const id = setInterval(() => setIndex((i) => (i + 1) % fullItems.length), 3500);
    return () => clearInterval(id);
  }, [fullItems.length]);

  const current = fullItems[index];

  return (
    <div className="relative w-full max-w-md mx-auto select-none">
      
      {/* Glow Background */}
      <motion.div
        className="absolute inset-0 rounded-3xl bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.15),rgba(147,51,234,0.1),transparent_70%)] blur-xl"
      />

      <div className="relative overflow-hidden rounded-3xl backdrop-blur-md bg-white/10 border border-white/20 shadow-2xl">
        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.9, y: 25 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: -25 }}
            transition={{ duration: 0.6 }}
            className="p-5 cursor-pointer"
            onClick={() => {
              if (current.browse) return onSelectBrowse();
              onSelectTemplate(current);
            }}
          >
            <motion.div
              whileHover={{ y: -8, scale: 1.02 }}
              transition={{ type: "spring", stiffness: 200 }}
              className="rounded-2xl bg-white shadow-xl border border-gray-200 overflow-hidden flex flex-col items-center justify-center min-h-[300px]"
            >
              {current.browse ? (
                <>
                  <div className="text-center py-16">
                    <h3 className="text-xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                      Browse All Templates
                    </h3>
                    <p className="text-gray-600 mt-2">Explore the full gallery</p>

                    <div className="mt-4 flex justify-center">
                      <span className="px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg shadow">
                        View Templates →
                      </span>
                    </div>
                  </div>
                </>
              ) : (
                <div className="p-4 flex flex-col items-center">
                  <img
                    src={current.thumbnail}
                    alt={current.name}
                    className="h-48 object-contain rounded-lg bg-blue-50 p-3"
                  />
                  <h3 className="mt-3 text-lg font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    {current.name}
                  </h3>
                  <p className="text-sm text-gray-600">{current.category}</p>
                </div>
              )}
            </motion.div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation */}
      <button
        onClick={() => setIndex((i) => (i - 1 + fullItems.length) % fullItems.length)}
        className="absolute left-2 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/70 hover:bg-white shadow-md flex items-center justify-center"
      >
        ‹
      </button>
      <button
        onClick={() => setIndex((i) => (i + 1) % fullItems.length)}
        className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/70 hover:bg-white shadow-md flex items-center justify-center"
      >
        ›
      </button>
    </div>
  );
}

/* ---------------------------------------------------
   MAIN PAGE COMPONENT
--------------------------------------------------- */
export default function ResumeLanding() {
  const navigate = useNavigate();
  const { user } = useAuth();

  const featured = useMemo(() => templates.slice(0, 4), []);

  /* -----------------------------
     SMART BUTTON HANDLERS 
  ------------------------------*/
  const startBuilding = () => {
    if (!user) {
      return navigate("/login", { state: { from: "/resume" } });
    }
    navigate("/resume/templates");
  };

  const browseAll = () => navigate("/resume/templates");

  const previewTemplate = (tpl) => {
    if (!user) {
      return navigate("/login", { state: { from: `/resume/build/${tpl.id}` } });
    }
    navigate(`/resume/build/${tpl.id}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50/40 relative overflow-hidden">
      <FloatingShapes />

      {/* --------------------------- HERO SECTION --------------------------- */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

          {/* LEFT TEXT */}
          <div>
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-700 bg-clip-text text-transparent"
            >
              Build a Professional Resume Effortlessly
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="mt-5 text-gray-600 text-lg"
            >
              Modern templates. ATS-friendly. Clean design system. Create a resume
              recruiters will actually read.
            </motion.p>

            {/* SINGLE CTA BUTTON */}
            <div className="mt-8">
              <motion.button
                whileHover={{ scale: 1.05 }}
                onClick={startBuilding}
                className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold shadow-lg"
              >
                Start Building
              </motion.button>
            </div>
          </div>

          {/* RIGHT CAROUSEL */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <Carousel
              items={featured}
              onSelectBrowse={browseAll}
              onSelectTemplate={previewTemplate}
            />
          </motion.div>
        </div>
      </section>

      {/* --------------------------- BENEFITS --------------------------- */}
      <section className="py-12 bg-gradient-to-r from-white to-gray-50/40">
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-8">
          {[
            { icon: "📄", title: "ATS Optimized", desc: "Formats designed to pass ATS filters easily." },
            { icon: "⚡", title: "Instant PDF Export", desc: "Export high-quality PDFs in one click." },
            { icon: "🎨", title: "Modern Designs", desc: "Professionally designed templates that stand out." },
            { icon: "🔒", title: "Secure Data", desc: "Your resume never leaves your device." },
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="p-6 rounded-xl bg-white shadow-lg border border-gray-200 hover:shadow-xl transition"
            >
              <div className="text-3xl">{item.icon}</div>
              <h4 className="mt-2 text-lg font-semibold">{item.title}</h4>
              <p className="text-gray-600 mt-1">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* --------------------------- FINAL CTA --------------------------- */}
      <section className="py-20">
        <div className="max-w-xl mx-auto text-center px-6">
          <motion.div
            whileHover={{ scale: 1.01 }}
            className="p-8 rounded-2xl bg-white shadow-xl border border-gray-200"
          >
            <h3 className="text-2xl font-semibold">Ready to create your resume?</h3>

            <motion.button
              whileHover={{ scale: 1.05 }}
              onClick={startBuilding}
              className="mt-5 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl shadow-lg font-semibold"
            >
              Get Started Now
            </motion.button>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
