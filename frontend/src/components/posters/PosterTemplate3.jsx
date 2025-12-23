// src/components/posters/PosterTemplate3.jsx
import { motion } from "framer-motion";

const clampStyle = {
  display: "-webkit-box",
  WebkitLineClamp: 4,
  WebkitBoxOrient: "vertical",
  overflow: "hidden",
};

export default function PosterTemplate3({ data }) {
  const { title, description, date, ctaText, ctaLink } = data || {};

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-xl overflow-hidden shadow-lg"
    >
      <div className="grid grid-cols-1 md:grid-cols-3">
        {/* LEFT PANEL */}
        <div className="md:col-span-2 p-6 bg-gradient-to-r from-sky-600 to-indigo-700 text-white">
          <h3 className="text-xl font-bold mb-2">{title}</h3>

          {date && (
            <div className="text-sky-100 text-sm mb-3">
              {new Date(date).toLocaleDateString()}
            </div>
          )}

          {description && (
            <p className="text-sm" style={clampStyle}>
              {description}
            </p>
          )}
        </div>

        {/* RIGHT PANEL */}
        <div className="p-6 flex items-center justify-center bg-white">
          {ctaLink ? (
            <a
              href={ctaLink}
              target="_blank"
              rel="noreferrer"
              className="bg-blue-600 text-white px-4 py-2 rounded-md font-semibold shadow"
            >
              {ctaText || "Learn More"}
            </a>
          ) : null}
        </div>
      </div>
    </motion.div>
  );
}