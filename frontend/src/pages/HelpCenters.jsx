import { useState, useEffect } from "react";
import api from "../utils/api"; // axios instance
import { motion} from "framer-motion";

export default function HelpCenters() {
  const districts = [
    "All",
    "Ahmednagar",
    "Akola",
    "Amravati",
    "Aurangabad",
    "Beed",
    "Bhandara",
    "Buldhana",
    "Chandrapur",
    "Dhule",
    "Gadchiroli",
    "Gondia",
    "Hingoli",
    "Jalgaon",
    "Jalna",
    "Kolhapur",
    "Latur",
    "Mumbai",
    "Mumbai Suburban",
    "Nagpur",
    "Nanded",
    "Nandurbar",
    "Nashik",
    "Osmanabad",
    "Palghar",
    "Parbhani",
    "Pune",
    "Raigad",
    "Ratnagiri",
    "Sangli",
    "Satara",
    "Sindhudurg",
    "Solapur",
    "Thane",
    "Wardha",
    "Washim",
    "Yavatmal",
  ];

  const [centers, setCenters] = useState([]); // DATA FROM BACKEND
  const [search, setSearch] = useState("");
  const [district, setDistrict] = useState("All");
  const [showSuggestions, setShowSuggestions] = useState(false);

  // Load Centers from API
  useEffect(() => {
    api.get("/centers").then((res) => {
      setCenters(res.data);
    });
  }, []);

  // Suggestion logic
  const suggestions = centers
    .filter((center) => {
      const s = search.toLowerCase();
      return (
        center.name.toLowerCase().includes(s) ||
        center.address.toLowerCase().includes(s) ||
        center.district.toLowerCase().includes(s)
      );
    })
    .slice(0, 5);

  // Final filtered list
  const filteredCenters = centers.filter((center) => {
    const matchesDistrict =
      district === "All" ? true : center.district === district;

    const s = search.toLowerCase();
    const matchesSearch =
      center.name.toLowerCase().includes(s) ||
      center.address.toLowerCase().includes(s) ||
      center.district.toLowerCase().includes(s);

    return matchesDistrict && matchesSearch;
  });

  return (
    <div className="space-y-8">

  {/* PAGE TITLE */}
  <motion.h1
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className="text-3xl font-bold text-[#0F2A3A]"
  >
    Help Centers in Maharashtra
  </motion.h1>

  {/* SEARCH + FILTER */}
  <motion.div
    initial={{ opacity: 0, y: 15 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 0.1 }}
    className="bg-[#F6F9FB] border border-[#E6EEF3] 
               rounded-2xl p-5 shadow-sm"
  >
    <div className="flex flex-col md:flex-row gap-4 relative">

      {/* SEARCH */}
      <div className="w-full md:w-1/2 relative">
        <input
          type="text"
          placeholder="Search by name, city or address"
          className="w-full px-4 py-2.5 rounded-lg 
                     border border-[#E6EEF3] 
                     bg-white text-[#132B3C]
                     focus:outline-none focus:ring-2 focus:ring-[#5E9AA6]"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setShowSuggestions(true);
          }}
        />

        {/* AUTO SUGGESTIONS */}
        {showSuggestions && search && (
          <motion.ul
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            className="absolute left-0 right-0 mt-2 bg-white 
                       border border-[#E6EEF3] rounded-xl 
                       shadow-lg max-h-48 overflow-y-auto z-10"
          >
            {suggestions.length > 0 ? (
              suggestions.map((sug) => (
                <li
                  key={sug._id}
                  className="px-4 py-2 text-sm 
                             hover:bg-[#EEF3F6] cursor-pointer"
                  onClick={() => {
                    setSearch(sug.name);
                    setShowSuggestions(false);
                  }}
                >
                  <span className="font-medium text-[#0F2A3A]">
                    {sug.name}
                  </span>
                  <span className="text-[#6B7C87]">
                    {" "}— {sug.district}
                  </span>
                </li>
              ))
            ) : (
              <li className="px-4 py-2 text-sm text-[#6B7C87]">
                No suggestions found
              </li>
            )}
          </motion.ul>
        )}
      </div>

      {/* DISTRICT FILTER */}
      <select
        className="px-4 py-2.5 rounded-lg 
                   border border-[#E6EEF3] bg-white 
                   text-[#132B3C]"
        value={district}
        onChange={(e) => setDistrict(e.target.value)}
      >
        {districts.map((d) => (
          <option key={d} value={d}>
            {d}
          </option>
        ))}
      </select>

    </div>
  </motion.div>

  {/* LIST VIEW */}
  <div className="bg-white border border-[#E6EEF3] 
                  rounded-2xl divide-y shadow-sm">

    {filteredCenters.length > 0 ? (
      filteredCenters.map((center, i) => (
        <motion.div
          key={center._id}
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.05 }}
          className="p-5 hover:bg-[#F6F9FB] transition"
        >
          <div className="flex justify-between items-start gap-4">
            <h2 className="text-lg font-semibold text-[#0F2A3A]">
              {center.name}
            </h2>

            <span className="text-xs font-medium 
                             bg-[#EEF3F6] text-[#4F8F9D] 
                             px-3 py-1 rounded-full">
              {center.district}
            </span>
          </div>

          <p className="mt-1 text-sm text-[#6B7C87]">
            {center.address}
          </p>

          <div className="flex flex-wrap gap-4 mt-3 text-sm">
            <a
              href={`tel:${center.contact}`}
              className="text-[#0F2A3A] font-medium hover:underline"
            >
              📞 {center.contact}
            </a>

            {center.mapLink && (
              <a
                href={center.mapLink}
                target="_blank"
                className="text-[#4F8F9D] hover:underline"
              >
                View on Google Maps →
              </a>
            )}
          </div>
        </motion.div>
      ))
    ) : (
      <p className="p-6 text-center text-[#6B7C87]">
        No help centers found.
      </p>
    )}
  </div>

</div>

  );
}
