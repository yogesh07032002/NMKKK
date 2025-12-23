import React from "react";
import { motion } from "framer-motion";

const Contact = () => {
  return (
    <section className="py-24 bg-[#F6F9FB]">
      <div className="max-w-6xl mx-auto px-6">

        {/* PAGE HEADER */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center max-w-2xl mx-auto"
        >
          <h1 className="text-3xl md:text-4xl font-bold text-[#0F2A3A]">
            Contact Us
          </h1>
          <p className="mt-4 text-[#6B7C87]">
            Have questions or need assistance?  
            Our team is here to help you.
          </p>
        </motion.div>

        {/* CONTENT */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-12">

          {/* CONTACT INFO */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="bg-white border border-[#E6EEF3] 
                       rounded-2xl p-8 shadow-lg"
          >
            <h3 className="text-xl font-semibold text-[#0F2A3A]">
              Get in Touch
            </h3>

            <p className="mt-3 text-sm text-[#6B7C87]">
              Reach out to us for resume-related support, feedback,
              or technical assistance.
            </p>

            <div className="mt-6 space-y-4 text-sm">
              <div className="flex gap-3">
                <span className="text-[#4F8F9D]">📧</span>
                <span className="text-[#132B3C]">
                  support@resumeportal.com
                </span>
              </div>

              <div className="flex gap-3">
                <span className="text-[#4F8F9D]">📞</span>
                <span className="text-[#132B3C]">
                  +91 90000 00000
                </span>
              </div>

              <div className="flex gap-3">
                <span className="text-[#4F8F9D]">📍</span>
                <span className="text-[#132B3C]">
                  Maharashtra, India
                </span>
              </div>
            </div>

            <div className="mt-8 text-xs text-[#6B7C87]">
              Response time: within 24–48 working hours
            </div>
          </motion.div>

          {/* CONTACT FORM */}
          <motion.form
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="bg-white border border-[#E6EEF3] 
                       rounded-2xl p-8 shadow-lg space-y-5"
          >
            <h3 className="text-xl font-semibold text-[#0F2A3A]">
              Send a Message
            </h3>

            <div>
              <label className="block text-sm text-[#6B7C87] mb-1">
                Full Name
              </label>
              <input
                type="text"
                placeholder="Enter your name"
                className="w-full px-4 py-2.5 rounded-lg 
                           border border-[#E6EEF3] 
                           focus:outline-none focus:ring-2 
                           focus:ring-[#5E9AA6]"
              />
            </div>

            <div>
              <label className="block text-sm text-[#6B7C87] mb-1">
                Email Address
              </label>
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full px-4 py-2.5 rounded-lg 
                           border border-[#E6EEF3] 
                           focus:outline-none focus:ring-2 
                           focus:ring-[#5E9AA6]"
              />
            </div>

            <div>
              <label className="block text-sm text-[#6B7C87] mb-1">
                Message
              </label>
              <textarea
                rows="4"
                placeholder="Write your message..."
                className="w-full px-4 py-2.5 rounded-lg 
                           border border-[#E6EEF3] 
                           focus:outline-none focus:ring-2 
                           focus:ring-[#5E9AA6]"
              />
            </div>

            <button
              type="submit"
              className="w-full mt-2 px-6 py-3 
                         bg-[#0F2A3A] hover:bg-[#132B3C] 
                         text-white rounded-xl font-semibold 
                         shadow-md transition"
            >
              Submit Message
            </button>
          </motion.form>

        </div>
      </div>
    </section>
  );
};

export default Contact;
