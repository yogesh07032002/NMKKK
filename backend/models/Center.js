import mongoose from "mongoose";

const CenterSchema = new mongoose.Schema(
  {
    district: { type: String, required: true },
    name: { type: String, required: true },
    address: { type: String, required: true },
    contact: { type: String, required: true },
    hours: { type: String, default: "10 AM - 5 PM" },
    mapLink: { type: String, default: "" }
  },
  { timestamps: true }
);

export default mongoose.model("Center", CenterSchema);
