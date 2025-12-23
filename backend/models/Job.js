import mongoose from "mongoose";

const JobSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    organization: { type: String },
    department: { type: String },
    type: { type: String },
    qualification: { type: String },
    location: { type: String },
    salary: { type: String },
    vacancies: { type: String },
    lastDate: { type: Date },
    postedDate: { type: Date, default: Date.now },
    applyLink: { type: String },
    notificationPdf: { type: String },
    description: { type: String },

    eligibility: {
      minAge: Number,
      maxAge: Number,
      minSSC: Number,
      minHSC: Number,
      minGraduationScore: Number,
      experienceRequired: Number,
      otherCriteria: String
    },

    // Simplified — only one status
    status: {
      type: String,
      enum: ["active"],
      default: "active"
    }
  },
  { timestamps: true }
);

export default mongoose.model("Job", JobSchema);
