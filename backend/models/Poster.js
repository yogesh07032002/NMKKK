// backend/models/Poster.js
import mongoose from "mongoose";

const PosterSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      enum: ["template", "image"],
      required: true
    },

    // for image posters
    image: { type: String },

    // for template posters
    template: { type: String },
    title: { type: String },
    subtitle: { type: String },
    description: { type: String },
    date: { type: String },
    ctaText: { type: String },
    ctaLink: { type: String }
  },
  { timestamps: true }
);

export default mongoose.model("Poster", PosterSchema);
