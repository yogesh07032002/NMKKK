// src/components/posters/PosterTemplatesPreview.jsx
import PosterTemplate1 from "./PosterTemplate1";
import PosterTemplate2 from "./PosterTemplate2";
import PosterTemplate3 from "./PosterTemplate3";

export default function PosterTemplatesPreview({ selected, onSelect }) {
  const small = "w-40 h-48 p-2 rounded-lg cursor-pointer border";
  return (
    <div className="flex gap-3 flex-wrap">
      <div className={`${small} ${selected === "template1" ? "ring-2 ring-blue-500" : "bg-white"}`} onClick={() => onSelect("template1")}>
        <PosterTemplate1 data={{ title: "Sample Title", subtitle: "Announcement", description: "Short description", ctaText: "Apply Now", date: "10 Jan" }} />
      </div>

      <div className={`${small} ${selected === "template2" ? "ring-2 ring-blue-500" : "bg-white"}`} onClick={() => onSelect("template2")}>
        <PosterTemplate2 data={{ title: "Open Positions", subtitle: "Recruitment", description: "Quick details here", ctaText: "Read More", date: "20 Feb" }} />
      </div>

      <div className={`${small} ${selected === "template3" ? "ring-2 ring-blue-500" : "bg-white"}`} onClick={() => onSelect("template3")}>
        <PosterTemplate3 data={{ title: "Seminar", subtitle: "Free Workshop", description: "Register now", ctaText: "Register", date: "5 Mar" }} />
      </div>
    </div>
  );
}
