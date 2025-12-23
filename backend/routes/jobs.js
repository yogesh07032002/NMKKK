// backend/routes/jobs.js
import express from "express";
import {
  createJob,
  getJobs,
  getJob,
  updateJob,
  deleteJob,
  updateJobStatus,
  getAllJobsForAdmin,
  filterJobs
} from "../controllers/jobController.js";

import auth from "../middleware/auth.js";
import admin from "../middleware/admin.js";
import pdfUpload from "../middleware/pdfUpload.js";

const router = express.Router();

/* ---------------- PUBLIC ---------------- */
router.get("/", getJobs);
router.post("/filter", filterJobs);

/* ---------------- ADMIN ---------------- */
router.get("/admin/all", auth, admin, getAllJobsForAdmin);

router.post("/", auth, admin, pdfUpload.single("notificationPdf"), createJob);

router.patch("/:id/status", auth, admin, updateJobStatus);

router.put("/:id", auth, admin, pdfUpload.single("notificationPdf"), updateJob);

router.delete("/:id", auth, admin, deleteJob);

/* ---------------- JOB DETAILS (LAST) ---------------- */
router.get("/:id", getJob);

export default router;
