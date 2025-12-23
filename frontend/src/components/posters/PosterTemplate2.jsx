// src/components/posters/PosterTemplate2.jsx
import { motion } from "framer-motion";

export default function PosterTemplate2({ data }) {
  const { title, description, date, ctaText, ctaLink } = data || {};

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-xl overflow-hidden shadow bg-white p-6 border"
    >
      <h2 className="text-xl font-bold text-gray-800 mb-2">{title}</h2>

      {date && (
        <div className="text-gray-500 text-sm mb-2">
          {new Date(date).toLocaleDateString()}
        </div>
      )}

      {description && (
        <p className="text-gray-700 text-sm mb-4">{description}</p>
      )}

      {ctaLink ? (
        <a
          href={ctaLink}
          target="_blank"
          rel="noreferrer"
          className="inline-block bg-blue-600 text-white px-4 py-2 rounded font-semibold shadow"
        >
          {ctaText || "Learn More"}
        </a>
      ) : null}
    </motion.div>
  );
}