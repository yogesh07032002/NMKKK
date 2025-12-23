import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function AgeCalculatorModal({ isOpen, onClose }) {
  const navigate = useNavigate();

  const [dob, setDob] = useState("");
  const [age, setAge] = useState(null);
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (!isOpen) {
      setDob("");
      setAge(null);
      setMessage("");
    }
  }, [isOpen]);

  /* -------------------- AGE LOGIC -------------------- */
  const calcAge = (value) => {
    if (!value) {
      setAge(null);
      setMessage("");
      return;
    }

    const birth = new Date(value);
    if (isNaN(birth)) {
      setAge(null);
      setMessage("Invalid date");
      return;
    }

    const today = new Date();
    let years = today.getFullYear() - birth.getFullYear();
    const m = today.getMonth() - birth.getMonth();
    const d = today.getDate() - birth.getDate();

    if (m < 0 || (m === 0 && d < 0)) years--;

    if (years < 0) {
      setAge(null);
      setMessage("You entered a future date.");
      return;
    }

    setAge(years);
    setMessage("");
  };

  const handleDobChange = (e) => {
    const v = e.target.value;
    setDob(v);
    calcAge(v);
  };

  /* -------------------- REDIRECT on Use -------------------- */
  const handleUse = () => {
    if (age === null) return;

    // Pass age into placements page
    navigate("/placements", {
      state: { prefilledAge: age }
    });

    onClose();
  };

  return (
    <AnimatePresence>
  {isOpen && (
    <>
      {/* BACKDROP */}
      <motion.div
        className="fixed inset-0 bg-[#0F2A3A]/50 backdrop-blur-sm z-40"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      />

      {/* MODAL */}
      <motion.div
        className="fixed z-50 top-1/2 left-1/2 w-[92%] max-w-md 
                   bg-[#F6F9FB] p-6 rounded-2xl shadow-2xl 
                   border border-[#E6EEF3]"
        initial={{ opacity: 0, scale: 0.85, x: "-50%", y: "-50%" }}
        animate={{ opacity: 1, scale: 1, x: "-50%", y: "-50%" }}
        exit={{ opacity: 0, scale: 0.85 }}
      >
        <h3 className="text-xl font-semibold mb-3 text-[#0F2A3A]">
          Age Calculator
        </h3>

        <p className="text-sm text-[#6B7C87] mb-4">
          Enter your date of birth to calculate exact age — helpful for eligibility checks.
        </p>

        <div className="grid grid-cols-1 gap-4">
          <input
            type="date"
            className="border border-[#E6EEF3] bg-[#EEF3F6] 
                       p-3 rounded-lg text-sm text-[#132B3C] 
                       focus:outline-none focus:ring-2 focus:ring-[#5E9AA6]"
            value={dob}
            onChange={handleDobChange}
          />

          <div className="flex items-center justify-between gap-3 bg-white p-4 rounded-xl border border-[#E6EEF3]">
            <div>
              <div className="text-xs text-[#6B7C87]">Calculated age</div>
              <div className="text-2xl font-bold text-[#132B3C]">
                {age === null ? "—" : `${age} yrs`}
              </div>
            </div>

            <div className="text-right">
              {message ? (
                <div className="text-sm text-red-600">{message}</div>
              ) : age !== null ? (
                <div className="text-sm text-[#4F8F9D] font-medium">
                  Looks good — ready to use
                </div>
              ) : (
                <div className="text-sm text-[#6B7C87]">Enter DOB above</div>
              )}
            </div>
          </div>

          <div className="flex gap-3 mt-2">
            <button
              onClick={handleUse}
              disabled={age === null}
              className={`flex-1 px-4 py-2 rounded-lg font-semibold text-white transition ${
                age === null
                  ? "bg-[#6B7C87]/40 cursor-not-allowed"
                  : "bg-[#4F8F9D] hover:bg-[#5E9AA6] shadow-md"
              }`}
            >
              Use for Eligibility
            </button>

            <button
              onClick={onClose}
              className="px-4 py-2 rounded-lg border border-[#E6EEF3] 
                         text-[#132B3C] hover:bg-[#EEF3F6]"
            >
              Close
            </button>
          </div>
        </div>

        <div className="mt-4 text-xs text-[#6B7C87] text-center">
          This tool gives approximate age — always verify with job notifications.
        </div>
      </motion.div>
    </>
  )}
</AnimatePresence>

  );
}
