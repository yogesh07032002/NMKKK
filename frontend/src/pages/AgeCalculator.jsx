import { useState } from "react";

export default function AgeCalculator() {
  const [dob, setDob] = useState("");
  const [age, setAge] = useState(null);

  const calculateAge = () => {
    if (!dob) return;

    const birth = new Date(dob);
    const today = new Date();

    let years = today.getFullYear() - birth.getFullYear();
    const m = today.getMonth() - birth.getMonth();

    if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) {
      years--;
    }

    setAge(years);
  };

  return (
    <div className="max-w-md mx-auto p-6 mt-10 bg-white rounded-xl shadow space-y-4">
      <h1 className="text-3xl font-bold text-center">Age Calculator</h1>

      <label className="font-semibold">Enter Date of Birth</label>
      <input
        type="date"
        className="w-full p-2 border rounded"
        value={dob}
        onChange={(e) => setDob(e.target.value)}
      />

      <button
        onClick={calculateAge}
        className="w-full py-2 bg-blue-600 text-white rounded mt-2"
      >
        Calculate Age
      </button>

      {age !== null && (
        <p className="text-center mt-4 text-xl font-semibold">
          Your Age: {age} years
        </p>
      )}
    </div>
  );
}
