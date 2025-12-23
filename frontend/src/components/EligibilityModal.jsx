// src/components/EligibilityModal.jsx
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import PlacementEligibility from "../pages/PlacementEligibility";
import { useNavigate } from "react-router-dom";

export default function EligibilityModal({ isOpen, onClose }) {
  const navigate = useNavigate();
  const [results, setResults] = useState(null);

  const handleResult = (jobs) => {
    setResults(jobs);
  };

  const goToEligibleJobs = () => {
    navigate("/jobs", { state: { eligibleJobs: results } });
    onClose();
  };

  const resetModal = () => {
    setResults(null);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* BACKDROP */}
          <motion.div
            className="fixed inset-0 bg-black/45 backdrop-blur-sm z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* MODAL */}
          <motion.div
            className="fixed z-50 top-1/2 left-1/2 w-[92%] max-w-lg bg-white p-7 rounded-2xl shadow-xl border border-gray-100"
            initial={{ opacity: 0, scale: 0.8, x: "-50%", y: "-50%" }}
            animate={{ opacity: 1, scale: 1, x: "-50%", y: "-50%" }}
            exit={{ opacity: 0, scale: 0.8 }}
          >
            {/* HEADER */}
            {!results && (
              <h2 className="text-2xl font-bold mb-4 text-gray-800 text-center">
                Eligibility Checker
              </h2>
            )}

            {/* FORM STATE */}
            {!results ? (
              <PlacementEligibility onResult={handleResult} />
            ) : (
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center py-4"
              >
                {/* SUCCESS BLOCK */}
                {results.length > 0 && (
                  <div>
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="text-green-500 text-5xl mb-3"
                    >
                      ✅
                    </motion.div>

                    <h3 className="text-xl font-semibold text-gray-800">
                      Great! 🎉
                    </h3>

                    <p className="text-gray-600 mt-1">
                      You’re eligible for{" "}
                      <span className="font-bold text-blue-600">
                        {results.length}
                      </span>{" "}
                      job{results.length > 1 ? "s" : ""}.
                    </p>

                    <button
                      onClick={goToEligibleJobs}
                      className="mt-6 w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl shadow-lg font-semibold transition"
                    >
                      See Eligible Jobs
                    </button>

                    <button
                      onClick={resetModal}
                      className="mt-3 w-full py-2 text-sm text-gray-600 underline"
                    >
                      Check Again
                    </button>
                  </div>
                )}

                {/* NO MATCH BLOCK */}
                {results.length === 0 && (
                  <div>
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="text-red-500 text-5xl mb-3"
                    >
                      ⚠️
                    </motion.div>

                    <h3 className="text-xl font-semibold text-gray-800">
                      No Matching Jobs Found
                    </h3>

                    <p className="text-gray-600 mt-1 px-4">
                      We couldn’t find any jobs that match your eligibility
                      right now.  
                      Don’t worry — new jobs are added regularly.
                    </p>

                    <button
                      onClick={() => {
                        onClose();
                        navigate("/jobs");
                      }}
                      className="mt-6 w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl shadow-lg font-semibold transition"
                    >
                      Explore All Jobs
                    </button>

                    <button
                      onClick={resetModal}
                      className="mt-3 w-full py-2 text-sm text-gray-600 underline"
                    >
                      Try Again with Different Details
                    </button>
                  </div>
                )}
              </motion.div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
