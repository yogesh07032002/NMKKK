import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

export default function Guidance() {
  const navigate = useNavigate();

  const items = [
    {
      title: "Government Job Guidance",
      desc: "Know exam patterns, age limits, qualifications, and upcoming notifications.",
      icon: "🏛️",
      action: () => navigate("/jobs"),
    },
    {
      title: "Private Job Guidance",
      desc: "Find the best private job roles based on skills, education, and experience.",
      icon: "💼",
      action: () => navigate("/placements"),
    },
    {
      title: "Resume Building Help",
      desc: "Create a professional resume that stands out. ATS-friendly and modern.",
      icon: "📄",
      action: () => navigate("/resume-landing"),
    },
    {
      title: "Check Your Eligibility",
      desc: "Enter details and instantly see jobs that match your profile.",
      icon: "🎯",
      action: () => navigate("/placements"),
    },
    {
      title: "Career Roadmaps",
      desc: "Get step-by-step learning paths for popular roles.",
      icon: "🗺️",
      action: () => alert("Coming Soon!"),
    },
    {
      title: "Talk to Mentor",
      desc: "Need personalised advice? Our experts will guide you.",
      icon: "👨‍🏫",
      action: () => alert("Coming Soon!"),
    },
  ];

  return (
    <div
  className="min-h-screen relative py-12 px-6 bg-cover bg-center"
  style={{
    backgroundImage:
      "url('/career.png')",
  }}
>
  {/* Overlay for subtle tint */}
  <div className="absolute inset-0 bg-white/80"></div>

  {/* Decorative Shapes */}
  <div className="absolute top-0 left-0 w-64 h-64 bg-[#4F8F9D]/20 rounded-full blur-3xl -translate-x-1/3 -translate-y-1/3"></div>
  <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#0F2A3A]/10 rounded-full blur-3xl translate-x-1/3 translate-y-1/4"></div>

  <div className="relative z-10 max-w-6xl mx-auto">
    {/* PAGE TITLE */}
    <motion.h1
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="text-3xl md:text-4xl font-extrabold text-center text-[#0F2A3A] mb-4"
    >
      Career Guidance & Support
    </motion.h1>

    <motion.p
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="text-gray-600 text-center max-w-2xl mx-auto mb-12 text-sm md:text-base"
    >
      Get personalised help for Government exams, private jobs, resume building, and more. Choose a section to begin.
    </motion.p>

    {/* GRID SECTION */}
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {items.map((item, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.1 }}
          whileHover={{ scale: 1.05, y: -3 }}
          className="bg-white rounded-2xl shadow-lg border border-gray-200 cursor-pointer overflow-hidden transition-all hover:shadow-2xl"
          onClick={item.action}
        >
          <div className="p-6 flex flex-col items-center text-center">
            <div className="text-5xl mb-4">{item.icon}</div>
            <h3 className="font-semibold text-lg mb-2 text-[#0F2A3A]">{item.title}</h3>
            <p className="text-sm text-gray-600">{item.desc}</p>
          </div>
        </motion.div>
      ))}
    </div>

    {/* FINAL CTA */}
    <div className="text-center mt-16 relative z-10">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
      >
        <h2 className="text-2xl md:text-3xl font-bold mb-4 text-[#0F2A3A]">
          Not sure where to start?
        </h2>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate("/placements")}
          className="px-8 py-3 md:px-10 md:py-4 bg-gradient-to-r from-[#0F2A3A] to-[#4F8F9D] text-white rounded-xl shadow-lg font-semibold text-sm md:text-base transition-all hover:from-[#132B3C] hover:to-[#5E9AA6]"
        >
          Start with Eligibility Check
        </motion.button>
      </motion.div>
    </div>
  </div>
</div>



  );
}
