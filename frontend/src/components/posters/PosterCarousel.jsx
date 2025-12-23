// src/components/posters/PosterCarousel.jsx
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import PosterDisplay from "./PosterDisplay";

export default function PosterCarousel({ posters = [] }) {
  const [index, setIndex] = useState(0);
  if (!posters || posters.length === 0) return null;

  const prev = () => setIndex((i) => (i === 0 ? posters.length - 1 : i - 1));
  const next = () => setIndex((i) => (i + 1) % posters.length);

  return (
    <div className="relative w-full rounded-xl">
      {/* DYNAMIC HEIGHT WRAPPER */}
      <div className="w-full flex justify-center bg-white rounded-xl shadow p-2">
        <AnimatePresence mode="wait">
          <motion.div
            key={posters[index]._id}
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -30 }}
            transition={{ duration: 0.35 }}
            className="w-full flex justify-center"
          >
            {/* PosterDisplay now expands freely */}
            <PosterDisplay
              poster={posters[index]}
              className="max-w-full max-h-[80vh] object-contain"
            />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Arrows */}
      {posters.length > 1 && (
        <>
          <button
            onClick={prev}
            className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/90 px-3 py-2 rounded-full shadow"
          >
            ‹
          </button>

          <button
            onClick={next}
            className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/90 px-3 py-2 rounded-full shadow"
          >
            ›
          </button>

          {/* Dots */}
          <div className="flex justify-center gap-2 mt-3">
            {posters.map((p, i) => (
              <button
                key={p._id}
                onClick={() => setIndex(i)}
                className={`w-2.5 h-2.5 rounded-full ${
                  i === index ? "bg-blue-600" : "bg-gray-300"
                }`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
