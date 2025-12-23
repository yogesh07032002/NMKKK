import mongoose from "mongoose";

const VideoSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    videoId: { type: String, required: true, unique: true }, // youtube id
    url: { type: String, required: true }, // original url
    thumbnail: { type: String }, // auto-generated from videoId
    description: { type: String, default: "" },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" } // optional
  },
  { timestamps: true }
);

export default mongoose.model("Video", VideoSchema);
