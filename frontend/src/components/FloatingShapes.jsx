// src/components/FloatingShapes.jsx
import { motion } from "framer-motion";

export default function FloatingShapes() {
  return (
    <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">

      {/* Soft Blue Bubble */}
      <motion.div
        className="absolute w-64 h-64 bg-blue-200 rounded-full blur-3xl opacity-30"
        initial={{ x: -80, y: 120 }}
        animate={{ x: 40, y: 10 }}
        transition={{
          duration: 8,
          repeat: Infinity,
          repeatType: "reverse",
          ease: "easeInOut",
        }}
      />

      {/* Purple Glow Bubble */}
      <motion.div
        className="absolute w-52 h-52 bg-purple-200 rounded-full blur-3xl opacity-20"
        initial={{ x: 180, y: -40 }}
        animate={{ x: 60, y: 80 }}
        transition={{
          duration: 10,
          repeat: Infinity,
          repeatType: "reverse",
          ease: "easeInOut",
        }}
      />

      {/* Diagonal glowing streak */}
      <motion.div
        className="absolute w-[450px] h-[100px] bg-gradient-to-r from-blue-300/40 to-purple-300/40 rotate-12 blur-2xl opacity-20"
        initial={{ x: -150, y: 280 }}
        animate={{ x: -20, y: 260 }}
        transition={{
          duration: 12,
          repeat: Infinity,
          repeatType: "reverse",
        }}
      />

    </div>
  );
}
