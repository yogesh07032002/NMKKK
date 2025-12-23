import mongoose from "mongoose";

const NotificationSchema = new mongoose.Schema(
  {
    text: { type: String, required: true },

    link: { type: String, default: "" },

    priority: {
      type: String,
      enum: ["normal", "high"],
      default: "normal",
    },

    active: { type: Boolean, default: true }
  },
  { timestamps: true }
);

export default mongoose.model("Notification", NotificationSchema);
