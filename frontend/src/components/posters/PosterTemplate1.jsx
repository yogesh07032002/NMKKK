// src/components/posters/PosterTemplate1.jsx
import { motion } from "framer-motion";

export default function PosterTemplate1({ data }) {
  const { title, description, date, ctaText, ctaLink } = data || {};

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.97 }}
      animate={{ opacity: 1, scale: 1 }}
      className="rounded-xl overflow-hidden shadow bg-gradient-to-br from-indigo-600 to-blue-500 text-white p-6"
    >
      <h2 className="text-xl font-bold mb-2">{title}</h2>

      {date && (
        <div className="text-blue-100 mb-2">{new Date(date).toLocaleDateString()}</div>
      )}

      {description && (
        <p className="text-sm opacity-90 mb-4">
          {description}
        </p>
      )}

      {ctaLink ? (
        <a
          href={ctaLink}
          target="_blank"
          rel="noreferrer"
          className="inline-block bg-white text-blue-600 font-semibold px-4 py-2 rounded shadow"
        >
          {ctaText || "Learn More"}
        </a>
      ) : null}
    </motion.div>
  );
}