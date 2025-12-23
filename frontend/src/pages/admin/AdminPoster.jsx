// src/pages/admin/AdminPoster.jsx
import { useEffect, useState, useRef } from "react";
import api from "../../utils/api";
import { useNavigate } from "react-router-dom";
import PosterDisplay from "../../components/posters/PosterDisplay";
import PosterTemplate1 from "../../components/posters/PosterTemplate1";
import PosterTemplate2 from "../../components/posters/PosterTemplate2";
import PosterTemplate3 from "../../components/posters/PosterTemplate3";
import TemplateModal from "../../components/posters/TemplateModal"; // NEW
import {
  TrashIcon,
  PencilSquareIcon,
  PhotoIcon,
  RectangleGroupIcon,
  PlusCircleIcon,
} from "@heroicons/react/24/outline";

export default function AdminPoster() {
  const navigate = useNavigate();

  // form state
  const [form, setForm] = useState({
    type: "template", // 'template' | 'image'
    template: "template1", // template key
    title: "",
    description: "",
    date: "",
    ctaText: "",
    ctaLink: "",
  });

  const [imageFile, setImageFile] = useState(null); // actual File
  const [imagePreview, setImagePreview] = useState(null); // local URL for preview
  const [loading, setLoading] = useState(false);

  // posters list
  const [posters, setPosters] = useState([]);
  const [loadingPosters, setLoadingPosters] = useState(true);

  // editing
  const [editingId, setEditingId] = useState(null);

  // template modal
  const [openTemplateModal, setOpenTemplateModal] = useState(false);

  const fileInputRef = useRef(null);

  useEffect(() => {
    loadPosters();
    // cleanup preview URL on unmount
    return () => {
      if (imagePreview) URL.revokeObjectURL(imagePreview);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const loadPosters = async () => {
    setLoadingPosters(true);
    try {
      const res = await api.get("/posters");
      // API might return single object or array — normalize to array
      if (!res.data) {
        setPosters([]);
      } else if (Array.isArray(res.data)) {
        setPosters(res.data);
      } else if (typeof res.data === "object") {
        if (res.data.posters && Array.isArray(res.data.posters)) {
          setPosters(res.data.posters);
        } else {
          setPosters([res.data]);
        }
      } else {
        setPosters([]);
      }
    } catch (err) {
      console.error("Load posters failed:", err);
      setPosters([]);
    } finally {
      setLoadingPosters(false);
    }
  };

  const handleChange = (k, v) => {
    setForm((s) => ({ ...s, [k]: v }));
  };

  const handleImageSelect = (file) => {
    if (!file) {
      setImageFile(null);
      if (imagePreview) {
        URL.revokeObjectURL(imagePreview);
        setImagePreview(null);
      }
      return;
    }
    setImageFile(file);
    const url = URL.createObjectURL(file);
    if (imagePreview) URL.revokeObjectURL(imagePreview);
    setImagePreview(url);
  };

  const startCreateTemplate = (tpl) => {
    setForm((s) => ({ ...s, type: "template", template: tpl }));
    setImageFile(null);
    if (imagePreview) {
      URL.revokeObjectURL(imagePreview);
      setImagePreview(null);
    }
    setEditingId(null);
    // open preview scroll to top
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const startCreateImage = () => {
    setForm((s) => ({ ...s, type: "image" }));
    setEditingId(null);
  };

  const startEdit = (p) => {
    setEditingId(p._id || p.id || null);
    const isImage = (p.type || "").toString() === "image";
    setForm({
      type: isImage ? "image" : "template",
      template: p.template || "template1",
      title: p.title || "",
      description: p.description || "",
      date: p.date ? new Date(p.date).toISOString().slice(0, 10) : "",
      ctaText: p.ctaText || "",
      ctaLink: p.ctaLink || "",
    });

    setImageFile(null);
    if (isImage && p.image) {
      const base = import.meta.env.VITE_API_BASE || "";
      setImagePreview((base && p.image && p.image.startsWith("/")) ? `${base}${p.image}` : p.image || null);
    } else {
      if (imagePreview) {
        URL.revokeObjectURL(imagePreview);
        setImagePreview(null);
      }
    }

    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const clearForm = () => {
    setForm({
      type: "template",
      template: "template1",
      title: "",
      description: "",
      date: "",
      ctaText: "",
      ctaLink: "",
    });
    setImageFile(null);
    if (imagePreview) {
      URL.revokeObjectURL(imagePreview);
      setImagePreview(null);
    }
    setEditingId(null);
  };

  const submit = async (e) => {
    e?.preventDefault?.();
    setLoading(true);
    try {
      const fd = new FormData();
      Object.keys(form).forEach((k) => {
        if (form[k] !== undefined && form[k] !== null) fd.append(k, form[k]);
      });

      if (imageFile) fd.append("image", imageFile);

      if (editingId) {
        await api.put(`/posters/${editingId}`, fd, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      } else {
        await api.post("/posters", fd, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      }

      await loadPosters();
      clearForm();
      alert("Poster saved");
    } catch (err) {
      console.error("Save poster failed:", err);
      alert("Save failed");
    } finally {
      setLoading(false);
    }
  };

  const deletePoster = async (id) => {
    if (!window.confirm("Delete this poster?")) return;
    try {
      await api.delete(`/posters/${id}`);
      await loadPosters();
    } catch (err) {
      console.error("Delete error:", err);
      alert("Delete failed");
    }
  };

  // live preview data builder
  const previewData = (() => {
    if (form.type === "image") {
      return { type: "image", image: imagePreview || null, title: form.title };
    }

    return {
      type: "template",
      template: form.template,
      title: form.title,
      description: form.description,
      date: form.date,
      ctaText: form.ctaText,
      ctaLink: form.ctaLink,
    };
  })();

  return (
    <div className="max-w-6xl mx-auto space-y-8 px-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Poster Management</h1>
        <div className="flex items-center gap-3">
          <button
            onClick={() => {
              clearForm();
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            className="px-4 py-2 rounded-md bg-gray-100 hover:bg-gray-200"
          >
            New Poster
          </button>
          <button
            onClick={() => navigate("/admin")}
            className="px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700 flex items-center gap-2"
          >
            <PlusCircleIcon className="w-4 h-4" /> Dashboard
          </button>
        </div>
      </div>

      {/* MAIN: split layout */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* LEFT: Form (2/3 width on md) */}
        <div className="md:col-span-2 bg-white p-6 rounded-xl shadow">
          <form onSubmit={submit} className="space-y-4">
            <div className="flex items-center gap-4">
              <label className={`px-3 py-2 rounded-lg cursor-pointer border ${form.type === "template" ? "bg-gradient-to-r from-sky-50 to-indigo-50 border-sky-200" : ""}`}>
                <input
                  type="radio"
                  name="type"
                  checked={form.type === "template"}
                  onChange={() => handleChange("type", "template")}
                  className="mr-2"
                />
                <RectangleGroupIcon className="inline w-4 h-4 mr-1" /> Template Poster
              </label>

              <label className={`px-3 py-2 rounded-lg cursor-pointer border ${form.type === "image" ? "bg-gradient-to-r from-sky-50 to-indigo-50 border-sky-200" : ""}`}>
                <input
                  type="radio"
                  name="type"
                  checked={form.type === "image"}
                  onChange={() => handleChange("type", "image")}
                  className="mr-2"
                />
                <PhotoIcon className="inline w-4 h-4 mr-1" /> Image Poster
              </label>
            </div>

            {/* TEMPLATE OPTIONS */}
            {form.type === "template" && (
              <>
                <div className="mb-2 text-sm text-gray-600 flex items-center justify-between">
                  <div>Choose a template</div>
                  <button
                    type="button"
                    onClick={() => setOpenTemplateModal(true)}
                    className="text-sm bg-gradient-to-r from-indigo-600 to-pink-600 text-white px-3 py-1 rounded shadow"
                  >
                    Open Template Gallery
                  </button>
                </div>

                {/* Form fields for template */}
                <input
                  value={form.title}
                  onChange={(e) => handleChange("title", e.target.value)}
                  placeholder="Title (required)"
                  className="w-full border p-2 rounded"
                  required
                />

                <textarea
                  value={form.description}
                  onChange={(e) => handleChange("description", e.target.value)}
                  placeholder="Short description (1-4 lines)"
                  className="w-full border p-2 rounded"
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <input
                    type="date"
                    value={form.date}
                    onChange={(e) => handleChange("date", e.target.value)}
                    className="w-full border p-2 rounded"
                  />
                  <input
                    value={form.ctaText}
                    onChange={(e) => handleChange("ctaText", e.target.value)}
                    placeholder="CTA text (optional)"
                    className="w-full border p-2 rounded"
                  />
                </div>

                <input
                  value={form.ctaLink}
                  onChange={(e) => handleChange("ctaLink", e.target.value)}
                  placeholder="CTA link (optional)"
                  className="w-full border p-2 rounded"
                />
              </>
            )}

            {/* IMAGE POSTER FIELDS */}
            {form.type === "image" && (
              <>
                <div className="text-sm text-gray-600 mb-2">Upload a ready-made poster image (recommended size: 1080×1350 or 1200×628)</div>
                <div className="border p-3 rounded bg-gray-50">
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleImageSelect(e.target.files?.[0] || null)}
                  />
                  <div className="text-sm text-gray-500 mt-2">Optional: provide Title and date (will appear on small overlay)</div>
                </div>

                <input
                  value={form.title}
                  onChange={(e) => handleChange("title", e.target.value)}
                  placeholder="Title (optional)"
                  className="w-full border p-2 rounded"
                />

                <input
                  type="date"
                  value={form.date}
                  onChange={(e) => handleChange("date", e.target.value)}
                  className="w-full border p-2 rounded"
                />
              </>
            )}

            {/* ACTIONS */}
            <div className="flex gap-3 mt-4">
              <button
                type="submit"
                disabled={loading}
                className={`px-4 py-2 rounded-lg text-white ${loading ? "bg-gray-400" : "bg-gradient-to-r from-indigo-600 to-pink-600 hover:from-indigo-700 hover:to-pink-700"}`}
              >
                {editingId ? "Update Poster" : "Create Poster"}
              </button>

              <button
                type="button"
                onClick={clearForm}
                className="px-4 py-2 rounded-lg border"
              >
                Reset
              </button>
            </div>
          </form>
        </div>

        {/* RIGHT: Live preview */}
        <div className="bg-white p-4 rounded-xl shadow sticky top-20">
          <h3 className="font-semibold mb-3">Live Preview</h3>

          <div className="w-full">
            <PosterDisplay poster={previewData} />
          </div>

          <div className="text-xs text-gray-500 mt-3">
            Preview updates as you type. Image previews use local upload (not saved) until you press Save.
          </div>
        </div>
      </div>

      {/* EXISTING POSTERS GRID */}
      <section className="bg-white p-6 rounded-xl shadow">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold">Existing Posters</h2>
          <div className="text-sm text-gray-500">{loadingPosters ? "Loading…" : `${posters.length} posters`}</div>
        </div>

        {posters.length === 0 ? (
          <div className="text-gray-500">No posters yet — create one above.</div>
        ) : (
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
            {posters.map((p) => {
              const safeTitle = p?.title || (p?.type === "image" ? "Image poster" : (p?.template ? p.template.replace("template", "Template ") : "Poster"));
              const base = import.meta.env.VITE_API_BASE || "";
              let previewProp = { ...p };
              if (p.type === "image" && p.image && p.image.startsWith("/") && base) {
                previewProp.image = `${base}${p.image}`;
              }

              return (
                <div key={p._id || p.id} className="border rounded-lg p-3 bg-gray-50">
                  <div className="flex items-center justify-between mb-2">
                    <div className="font-medium">{safeTitle}</div>
                    <div className="text-sm text-gray-500">{(p.date && new Date(p.date).toLocaleDateString()) || ""}</div>
                  </div>

                  <div className="mb-3 rounded overflow-hidden h-48">
                    <PosterDisplay poster={previewProp} className="h-48" />
                  </div>

                  <div className="flex gap-3">
                    <button
                      onClick={() => startEdit(p)}
                      className="px-3 py-1 rounded bg-white border hover:shadow-sm flex items-center gap-2"
                    >
                      <PencilSquareIcon className="w-4 h-4" /> Edit
                    </button>

                    <button
                      onClick={() => deletePoster(p._id)}
                      className="px-3 py-1 rounded bg-red-50 text-red-600 hover:bg-red-100 flex items-center gap-2"
                    >
                      <TrashIcon className="w-4 h-4" /> Delete
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>

      {/* TEMPLATE MODAL */}
      <TemplateModal
        isOpen={openTemplateModal}
        onClose={() => setOpenTemplateModal(false)}
        selected={form.template}
        onSelect={(tpl) => {
          handleChange("template", tpl);
          setOpenTemplateModal(false);
        }}
      />
    </div>
  );
}