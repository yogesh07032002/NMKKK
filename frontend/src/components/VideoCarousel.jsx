import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function VideoCarousel({ videos }) {
  const [index, setIndex] = useState(0);

  const prev = () => setIndex((i) => (i === 0 ? videos.length - 1 : i - 1));
  const next = () => setIndex((i) => (i + 1) % videos.length);

  if (!videos || videos.length === 0) return null;

  return (
    <div className="relative w-full bg-white rounded-xl shadow overflow-hidden p-3">
      {/* VIDEO */}
      <div className="relative h-40 flex items-center justify-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={videos[index]._id}
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -40 }}
            transition={{ duration: 0.4 }}
            className="w-full h-full cursor-pointer rounded-lg overflow-hidden shadow"
            onClick={() => window.open(videos[index].url, "_blank")}
          >
            <img
              src={videos[index].thumbnail}
              className="w-full h-full object-cover"
              alt={videos[index].title}
            />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* TITLE */}
      <p className="text-sm text-center mt-2 font-medium">
        {videos[index].title}
      </p>

      {/* ARROWS */}
      {videos.length > 1 && (
        <>
          <button
            className="absolute left-1 top-1/2 -translate-y-1/2 bg-white shadow px-2 py-1 rounded-full"
            onClick={prev}
          >
            ‹
          </button>
          <button
            className="absolute right-1 top-1/2 -translate-y-1/2 bg-white shadow px-2 py-1 rounded-full"
            onClick={next}
          >
            ›
          </button>
        </>
      )}
    </div>
  );
}
