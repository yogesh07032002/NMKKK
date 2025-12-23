import PosterTemplate1 from "./PosterTemplate1";
import PosterTemplate2 from "./PosterTemplate2";
import PosterTemplate3 from "./PosterTemplate3";

export default function PosterDisplay({ poster, className = "" }) {
  if (!poster) return null;

  const API = import.meta.env.VITE_API_BASE || "";

  /* -------------------------------------------------
     IMAGE POSTER
  ------------------------------------------------- */
  if (poster.type === "image") {
    let imgSrc = null;

    // CASE 1 → Local preview (blob URL)
    if (poster.image && poster.image.startsWith("blob:")) {
      imgSrc = poster.image;
    }
    // CASE 2 → Full URL returned by backend already
    else if (poster.image && poster.image.startsWith("http")) {
      imgSrc = poster.image;
    }
    // CASE 3 → Relative path like "/uploads/posters/xxx.png"
    else if (poster.image) {
      // Ensure a single slash when joining base + path
      imgSrc = API.replace(/\/$/, "") + poster.image;
    }

    return (
      <div className={`rounded-xl overflow-hidden shadow ${className}`}>
        {imgSrc ? (
          <img
            src={imgSrc}
            alt={poster.title || "Poster"}
            className="w-full h-full object-contain bg-black/5"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-500 bg-gray-100">
            No Image
          </div>
        )}
      </div>
    );
  }

  /* -------------------------------------------------
     TEMPLATE POSTER
  ------------------------------------------------- */
  const data = {
    title: poster.title || "",
    description: poster.description || "",
    date: poster.date || "",
    ctaText: poster.ctaText || "",
    ctaLink: poster.ctaLink || "",
  };

  if (poster.template === "template1") return <PosterTemplate1 data={data} />;
  if (poster.template === "template2") return <PosterTemplate2 data={data} />;
  return <PosterTemplate3 data={data} />;
}