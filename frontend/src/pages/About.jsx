import { motion,AnimatePresence  } from "framer-motion";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function About() {
  const [index, setIndex] = useState(0);

  const sliderImages = [
  "/about1.png",
  "/about2.png",
  "/about3.png",
];

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % sliderImages.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800">
      {/* HERO SECTION */}
      <section>
        <section className="relative w-full py-24 overflow-hidden">
          {/* Slider Images */}
          <div className="absolute inset-0">
            <AnimatePresence>
              <motion.img
                key={index}
                src={sliderImages[index]}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1 }}
                className="absolute inset-0 w-full h-full object-cover blur-sm scale-110"
              />
            </AnimatePresence>
            {/* Dark overlay for readability */}
            <div className="absolute inset-0 bg-[#0F2A3A]/70"></div>
          </div>

          {/* HERO CONTENT */}
          <div className="relative max-w-5xl mx-auto px-6 text-center text-white">
            <motion.h1
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-4xl md:text-5xl font-bold"
            >
              About <span className="text-[#5E9AA6]">NMK</span>
            </motion.h1>

            <div className="w-24 h-[2px] bg-[#4F8F9D] mx-auto mt-6 mb-8" />

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="text-[#E6EEF3] text-base md:text-lg leading-relaxed max-w-3xl mx-auto"
            >
              NMK is a centralized job portal focused on supporting the youth of
              Maharashtra by providing timely access to verified government job
              notifications, career guidance, and employment-related services.
              The platform simplifies the job-search process through reliable
              information, structured resources, and region-based assistance.
            </motion.p>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.35, duration: 0.6 }}
              className="text-[#E6EEF3] text-base md:text-lg leading-relaxed max-w-3xl mx-auto mt-4"
            >
              With dedicated help centers across the state, NMK ensures equal
              access to opportunities, promotes informed career decisions, and
              creates a transparent bridge between aspirants and public-sector
              employment.
            </motion.p>
          </div>
        </section>

        {/* Optional Decorative Shapes */}
        <div className="absolute top-0 left-0 w-40 h-40 bg-[#E6EEF3] rounded-full opacity-50 -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 right-0 w-60 h-60 bg-[#F6F9FB] rounded-full opacity-60 translate-x-1/2 translate-y-1/2"></div>
        <section className="w-full bg-[#F6F9FB] py-20">
          <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">
            {/* -------- LEFT: OVERLAPPING IMAGES -------- */}
            <div className="relative flex justify-center lg:justify-start">
              <img
                src="/Home1.png"
                alt="NMK Job Portal Team"
                className="w-[320px] h-[420px] object-cover rounded-2xl shadow-lg"
              />

              <img
                src="/handshake.png"
                alt="Career Guidance"
                className="absolute -bottom-10 left-40 w-[400px] h-[360px] object-cover rounded-2xl shadow-xl border-8 border-[#F6F9FB]"
              />
            </div>

            {/* -------- RIGHT: CONTENT -------- */}
            <div className="space-y-6 text-[#132B3C]">
              <span className="uppercase tracking-widest text-sm text-[#4F8F9D] font-semibold">
                Who We Are
              </span>

              <h2 className="text-3xl md:text-4xl font-extrabold leading-tight text-[#0F2A3A]">
                Empowering Careers Through <br className="hidden sm:block" />
                Trusted Job Opportunities
              </h2>

              <p className="text-[#6B7C87] leading-relaxed text-base md:text-lg">
                NMK Job Portal is a dedicated career platform designed to
                connect job seekers with genuine, verified opportunities across
                industries. We aim to simplify the hiring process by delivering
                accurate job updates, career guidance, and employer insights—all
                in one place.
              </p>

              <p className="text-[#6B7C87] leading-relaxed text-base md:text-lg">
                Our mission is to bridge the gap between talent and opportunity
                by providing real-time job alerts, transparent listings, and a
                user-first experience that helps candidates make confident
                career decisions.
              </p>

              {/* Highlight Bar */}
              <div className="bg-[#EEF3F6] border-l-4 border-[#5E9AA6] p-4 rounded-lg text-[#132B3C]">
                <p className="font-medium">
                  Trusted by job seekers for reliable updates, career growth,
                  and meaningful employment connections.
                </p>
              </div>
            </div>
          </div>
        </section>
      </section>

      {/* WHAT WE DO SECTION */}
      <section className="relative max-w-7xl mx-auto px-6 py-10">
        {/* SECTION HEADER */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="uppercase tracking-widest text-sm text-[#4F8F9D] font-semibold">
            Our Services
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-[#0F2A3A] mt-3">
            What We Offer
          </h2>
          <p className="text-[#6B7C87] mt-4 text-base md:text-lg">
            Everything you need to find the right job, prepare confidently, and
            grow your career — all in one place.
          </p>
        </div>

        {/* CARDS */}
        <div className="grid md:grid-cols-3 gap-8">
          {/* CARD 1 */}
          <motion.div
            whileHover={{ y: -10 }}
            transition={{ type: "spring", stiffness: 200 }}
            className="group relative bg-white rounded-2xl p-8 shadow-lg border border-[#E6EEF3] overflow-hidden"
          >
            {/* Hover Gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#0F2A3A] to-[#4F8F9D] opacity-0 group-hover:opacity-5 transition"></div>

            {/* Icon */}
            <div className="w-16 h-16 mx-auto flex items-center justify-center rounded-xl bg-[#EEF3F6] text-[#0F2A3A] text-3xl shadow group-hover:scale-110 transition">
              📄
            </div>

            <h3 className="text-xl font-semibold text-[#0F2A3A] mt-6 text-center">
              Government Job Updates
            </h3>

            <p className="text-[#6B7C87] text-sm mt-3 text-center leading-relaxed">
              Get verified government job notifications across Maharashtra with
              clear eligibility, deadlines, and application steps.
            </p>

            {/* Bottom Accent */}
            <div className="mt-6 w-12 h-1 bg-[#4F8F9D] mx-auto rounded-full"></div>
          </motion.div>

          {/* CARD 2 */}
          <motion.div
            whileHover={{ y: -10 }}
            transition={{ type: "spring", stiffness: 200 }}
            className="group relative bg-white rounded-2xl p-8 shadow-lg border border-[#E6EEF3] overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-[#0F2A3A] to-[#4F8F9D] opacity-0 group-hover:opacity-5 transition"></div>

            <div className="w-16 h-16 mx-auto flex items-center justify-center rounded-xl bg-[#EEF3F6] text-[#0F2A3A] text-3xl shadow group-hover:scale-110 transition">
              📝
            </div>

            <h3 className="text-xl font-semibold text-[#0F2A3A] mt-6 text-center">
              Resume Builder
            </h3>

            <p className="text-[#6B7C87] text-sm mt-3 text-center leading-relaxed">
              Build professional, ATS-friendly resumes using smart templates
              designed to highlight your skills and experience.
            </p>

            <div className="mt-6 w-12 h-1 bg-[#4F8F9D] mx-auto rounded-full"></div>
          </motion.div>

          {/* CARD 3 */}
          <motion.div
            whileHover={{ y: -10 }}
            transition={{ type: "spring", stiffness: 200 }}
            className="group relative bg-white rounded-2xl p-8 shadow-lg border border-[#E6EEF3] overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-[#0F2A3A] to-[#4F8F9D] opacity-0 group-hover:opacity-5 transition"></div>

            <div className="w-16 h-16 mx-auto flex items-center justify-center rounded-xl bg-[#EEF3F6] text-[#0F2A3A] text-3xl shadow group-hover:scale-110 transition">
              🎯
            </div>

            <h3 className="text-xl font-semibold text-[#0F2A3A] mt-6 text-center">
              Career Guidance
            </h3>

            <p className="text-[#6B7C87] text-sm mt-3 text-center leading-relaxed">
              Receive expert guidance, preparation tips, and career roadmaps to
              help you make informed career decisions.
            </p>

            <div className="mt-6 w-12 h-1 bg-[#4F8F9D] mx-auto rounded-full"></div>
          </motion.div>
        </div>
      </section>
    
      {/* HELP CENTERS SECTION */}
      <section className="relative overflow-hidden py-20 bg-gradient-to-br from-[#F4FAFB] via-[#EEF6F9] to-[#EAF4F8]">
        {/* Soft Decorative Blobs */}
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-[#5E9AA6]/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#4F8F9D]/20 rounded-full blur-3xl"></div>

        <div className="relative max-w-6xl mx-auto px-6 text-center">
          {/* Icon */}
          <div className="relative inline-flex items-center justify-center mb-6">
            <span className="absolute inline-flex h-full w-full rounded-full bg-[#4F8F9D]/40 animate-ping"></span>
            <div className="relative w-16 h-16 rounded-full bg-white text-[#0F2A3A] flex items-center justify-center text-3xl shadow-md">
              📍
            </div>
          </div>

          <h2 className="text-3xl md:text-4xl font-extrabold text-[#0F2A3A] mb-4">
            Help Centers Across Maharashtra
          </h2>

          <p className="max-w-2xl mx-auto text-[#6B7C87] text-base md:text-lg leading-relaxed">
            Offline support, real guidance, and trusted assistance — available
            across Maharashtra to help you move forward with clarity and
            confidence.
          </p>

          {/* STEPS */}
          <div className="mt-14 grid md:grid-cols-3 gap-10">
            {/* STEP 1 */}
            <div className="group bg-white rounded-2xl p-8 border border-[#E6EEF3] shadow hover:shadow-lg transition">
              <div className="text-4xl mb-4 text-[#4F8F9D] group-hover:animate-bounce">
                🏢
              </div>
              <h3 className="font-semibold text-lg text-[#0F2A3A] mb-2">
                Visit Center
              </h3>
              <p className="text-sm text-[#6B7C87]">
                Walk into the nearest NMK help center in your district.
              </p>
            </div>

            {/* STEP 2 */}
            <div className="group bg-white rounded-2xl p-8 border border-[#E6EEF3] shadow hover:shadow-lg transition">
              <div className="text-4xl mb-4 text-[#4F8F9D] group-hover:animate-bounce">
                🧑‍💼
              </div>
              <h3 className="font-semibold text-lg text-[#0F2A3A] mb-2">
                Get Guidance
              </h3>
              <p className="text-sm text-[#6B7C87]">
                Get help with job forms, preparation, and career planning.
              </p>
            </div>

            {/* STEP 3 */}
            <div className="group bg-white rounded-2xl p-8 border border-[#E6EEF3] shadow hover:shadow-lg transition">
              <div className="text-4xl mb-4 text-[#4F8F9D] group-hover:animate-bounce">
                🚀
              </div>
              <h3 className="font-semibold text-lg text-[#0F2A3A] mb-2">
                Move Forward
              </h3>
              <p className="text-sm text-[#6B7C87]">
                Apply confidently and take the next step in your career.
              </p>
            </div>
          </div>

          {/* CTA */}
          <div className="mt-14">
            <a
              href="/help-centers"
              className="inline-flex items-center gap-3 px-8 py-4 rounded-full
                   bg-gradient-to-r from-[#4F8F9D] to-[#5E9AA6]
                   text-white font-semibold shadow-md
                   hover:scale-105 transition-transform duration-300"
            >
              Find Nearest Center
              <span className="animate-bounce">→</span>
            </a>
          </div>
        </div>
      </section>

      {/* OWNER MESSAGE */}
      <section className="max-w-5xl mx-auto px-6 py-20 relative">
      {/* Decorative circles */}
      <div className="absolute -top-16 -left-16 w-48 h-48 bg-[#4F8F9D]/30 rounded-full animate-pulse"></div>
      <div className="absolute -bottom-16 -right-16 w-64 h-64 bg-[#132B3C]/20 rounded-full animate-pulse"></div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="bg-gradient-to-r from-[#EEF3F6] to-[#F6F9FB] border border-[#E6EEF3] rounded-2xl shadow-xl p-8 md:p-12 relative z-10 text-center overflow-hidden"
      >
        {/* Decorative Top Accent */}
        <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 w-32 h-32 bg-[#4F8F9D]/20 rounded-full animate-bounce"></div>

        <h2 className="text-3xl md:text-4xl font-bold text-[#0F2A3A] mb-6 relative z-10">
          Our Vision
        </h2>

        <p className="text-[#132B3C] text-base md:text-lg leading-relaxed max-w-3xl mx-auto relative z-10">
          NMK was created with a single goal — to simplify the job-seeking
          process and empower every student, graduate, and working professional
          in Maharashtra. Our mission is to make information accessible and
          provide tools that truly help you grow.
        </p>

        {/* Bottom accent */}
        <div className="mt-8 w-24 h-1 bg-[#5E9AA6] mx-auto rounded-full relative z-10"></div>
      </motion.div>
    </section>
    </div>
  );
}
