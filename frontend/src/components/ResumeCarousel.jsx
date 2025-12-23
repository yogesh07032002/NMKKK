import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import templates from "../data/resumeTemplates.json";

export default function ResumeCarousel() {
  const navigate = useNavigate();
  const featured = [...templates.slice(0, 3)];

  // Add CTA card at the end
  const slides = [
    ...featured,
    { id: "cta", name: "Start Building Yours!", cta: true },
  ];

  const [index, setIndex] = useState(0);

  // Auto-slide every 4 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((i) => (i + 1) % slides.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [slides.length]);

  const handlePrev = () => {
    setIndex((i) => (i - 1 + slides.length) % slides.length);
  };

  const handleNext = () => {
    setIndex((i) => (i + 1) % slides.length);
  };

  return (
    <div className="relative w-full max-w-sm mx-auto mt-6">

  {/* Smooth Radial Glow */}
  <div className="
      absolute inset-0 rounded-3xl
      bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.25),transparent_70%)]
  "></div>

  {/* Carousel container */}
  <div className="overflow-hidden rounded-3xl relative shadow-lg">
    <div
      className="flex transition-transform duration-700 ease-out"
      style={{ transform: `translateX(-${index * 100}%)` }}
    >
      {slides.map((item, idx) => (
        <div
          key={idx}
          className="min-w-full flex justify-center items-center p-6"
        >
          {/* CTA CARD */}
          {item.cta ? (
            <div
              onClick={() => navigate("/resume/templates")}
              className="
                w-full h-64 bg-gradient-to-br 
                from-blue-600 to-blue-500 
                text-white rounded-3xl shadow-xl 
                flex flex-col items-center justify-center 
                cursor-pointer hover:scale-[1.02] transition
              "
            >
              <h2 className="text-xl font-bold mb-2">Start Building Yours</h2>
              <p className="text-white/80">Choose from multiple templates</p>
              <div className="mt-4 animate-bounce text-3xl">↓</div>
            </div>
          ) : (
            /* TEMPLATE CARD */
            <div
              onClick={() => navigate("/resume/templates")}
              className="
                w-full bg-white rounded-3xl shadow-xl
                hover:shadow-2xl cursor-pointer
                transition transform hover:-translate-y-1 
              "
            >
              <img
                src={item.thumbnail}
                alt={item.name}
                className="rounded-t-3xl w-full h-72 object-contain bg-white p-3"
              />

              <div className="p-4">
                <h2 className="text-lg font-bold">{item.name}</h2>
                <p className="text-gray-600 text-sm">{item.category}</p>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  </div>


      {/* Prev / Next Controls */}
      <button
        onClick={handlePrev}
        className="
          absolute left-2 top-1/2 -translate-y-1/2 
          bg-white shadow p-2 rounded-full text-gray-700 
          hover:bg-gray-100
        "
      >
        ‹
      </button>

      <button
        onClick={handleNext}
        className="
          absolute right-2 top-1/2 -translate-y-1/2 
          bg-white shadow p-2 rounded-full text-gray-700 
          hover:bg-gray-100
        "
      >
        ›
      </button>

      {/* Dots */}
      <div className="flex justify-center mt-3 gap-1">
        {slides.map((_, i) => (
          <div
            key={i}
            className={`
              w-2 h-2 rounded-full transition 
              ${i === index ? "bg-blue-600" : "bg-gray-300"}
            `}
          ></div>
        ))}
      </div>
    </div>
  );
}
