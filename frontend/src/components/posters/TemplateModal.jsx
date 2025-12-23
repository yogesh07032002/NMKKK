// src/components/posters/TemplateModal.jsx
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import PosterTemplate1 from "./PosterTemplate1";
import PosterTemplate2 from "./PosterTemplate2";
import PosterTemplate3 from "./PosterTemplate3";
import { XMarkIcon } from "@heroicons/react/24/outline";

const TEMPLATES = ["template1", "template2", "template3"];

export default function TemplateModal({ isOpen, onClose, selected, onSelect }) {
  const [index, setIndex] = useState(TEMPLATES.indexOf(selected || "template1"));

  useEffect(() => {
    setIndex(TEMPLATES.indexOf(selected || "template1"));
  }, [selected]);

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e) => {
      if (e.key === "ArrowLeft") setIndex((i) => (i === 0 ? TEMPLATES.length - 1 : i - 1));
      if (e.key === "ArrowRight") setIndex((i) => (i + 1) % TEMPLATES.length);
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const sampleData = {
    title: "Sample Title",
    description: "A short sample description that shows how the template looks with text. It will be truncated in the real preview.",
    date: new Date().toISOString(),
    ctaText: "Apply Now",
    ctaLink: "#",
  };

  const renderTemplate = (tpl, data = sampleData) => {
    if (tpl === "template1") return <PosterTemplate1 data={data} />;
    if (tpl === "template2") return <PosterTemplate2 data={data} />;
    return <PosterTemplate3 data={data} />;
  };

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        {/* backdrop */}
        <motion.div
          className="absolute inset-0 bg-black/50"
          onClick={onClose}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        />

        {/* modal */}
        <motion.div
          className="relative w-full max-w-4xl bg-white rounded-2xl shadow-2xl overflow-hidden"
          initial={{ y: 20, opacity: 0, scale: 0.98 }}
          animate={{ y: 0, opacity: 1, scale: 1 }}
          exit={{ y: 10, opacity: 0, scale: 0.98 }}
        >
          <div className="flex items-center justify-between p-4 border-b">
            <div className="flex items-center gap-3">
              <div className="bg-gradient-to-r from-indigo-600 to-pink-500 text-white px-3 py-1 rounded">Templates</div>
              <h3 className="text-lg font-semibold">Choose a poster template</h3>
            </div>

            <div className="flex items-center gap-2">
              <div className="text-sm text-gray-500">Use ← → to navigate</div>
              <button onClick={onClose} className="p-2 rounded hover:bg-gray-100">
                <XMarkIcon className="w-5 h-5 text-gray-600" />
              </button>
            </div>
          </div>

          <div className="p-4 md:p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-start">
              {/* left: thumbnails column */}
              <div className="order-2 md:order-1 md:col-span-1 flex flex-col gap-3">
                {TEMPLATES.map((tpl, i) => (
                  <button
                    key={tpl}
                    onClick={() => setIndex(i)}
                    className={`rounded-lg overflow-hidden border ${i === index ? "ring-2 ring-indigo-400" : "border-gray-200"} `}
                  >
                    <div className="w-full h-28 flex items-center justify-center bg-gradient-to-br from-slate-50 to-white p-2">
                      {/* show a small static preview using the template components but constrained */}
                      <div className="w-full h-full overflow-hidden">
                        <div style={{ width: "100%", height: "100%" }}>
                          {renderTemplate(tpl, {
                            title: "Preview",
                            description: "Short sample",
                            date: new Date().toISOString(),
                            ctaText: "Apply",
                            ctaLink: "#",
                          })}
                        </div>
                      </div>
                    </div>
                    <div className="text-sm text-center p-2 bg-white">{tpl.replace("template", "Template ")}</div>
                  </button>
                ))}
              </div>

              {/* center: large preview */}
              <div className="order-1 md:order-2 md:col-span-2">
                <div className="relative rounded-xl overflow-hidden border">
                  <div className="p-6 bg-gradient-to-r from-sky-600 to-indigo-700 text-white">
                    {/* We render the currently selected template with sample data */}
                    <div className="mb-4">
                      <div className="text-sm uppercase font-semibold">{TEMPLATES[index].replace("template", "Template ")}</div>
                      <div className="text-2xl font-bold mt-2">Live Template Preview</div>
                    </div>
                    <div className="bg-white rounded-lg overflow-hidden p-0">
                      <div className="p-0">
                        {/* Render in a white canvas area so templates with gradients are visible similarly to the homepage */}
                        <div className="p-4 bg-white">
                          {renderTemplate(TEMPLATES[index], {
                            title: "Open Day — Apply Now",
                            description: "This is how your title and description will appear. CTA visible if you add a link.",
                            date: new Date().toISOString(),
                            ctaText: "Apply Now",
                            ctaLink: "#",
                          })}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-4 flex items-center justify-between gap-3">
                  <div className="flex gap-2">
                    <button
                      onClick={() => setIndex((i) => (i === 0 ? TEMPLATES.length - 1 : i - 1))}
                      className="px-3 py-2 bg-white rounded shadow"
                    >
                      ← Prev
                    </button>
                    <button
                      onClick={() => setIndex((i) => (i + 1) % TEMPLATES.length)}
                      className="px-3 py-2 bg-white rounded shadow"
                    >
                      Next →
                    </button>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => onSelect(TEMPLATES[index])}
                      className="px-4 py-2 rounded bg-gradient-to-r from-indigo-600 to-pink-600 text-white shadow"
                    >
                      Select Template
                    </button>
                    <button onClick={onClose} className="px-3 py-2 rounded border">
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-4 text-xs text-gray-200">
              Need a custom design? Contact the dev team for custom templates.
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}