// backend/controllers/jobController.js
import Job from "../models/Job.js";

/* ------------------------------------------------------
   CREATE JOB (ADMIN)
------------------------------------------------------ */
export const createJob = async (req, res) => {
  try {
    let jobData = { ...req.body };

    if (jobData.eligibility && typeof jobData.eligibility === "string") {
      try {
        jobData.eligibility = JSON.parse(jobData.eligibility);
      } catch {
        jobData.eligibility = {};
      }
    }

    if (jobData.lastDate) {
      const d = new Date(jobData.lastDate);
      if (!isNaN(d.getTime())) jobData.lastDate = d;
    }

    if (req.file) {
      jobData.notificationPdf = `/uploads/pdfs/${req.file.filename}`;
    }

    const job = await Job.create(jobData);
    res.json(job);
  } catch (err) {
    console.log("Create job error:", err);
    res.status(500).json({ msg: "Server error" });
  }
};


/* ------------------------------------------------------
   GET ALL JOBS (PUBLIC) -> ONLY OPEN JOBS
------------------------------------------------------ */
export const getJobs = async (req, res) => {
  try {
    // If caller explicitly asked for status=all (admin), return all
    if (req.query.status === "all") {
      let query = Job.find({});
      if (req.query.limit) query = query.limit(parseInt(req.query.limit));
      const jobs = await query.sort({ createdAt: -1 });
      return res.json(jobs);
    }

    // default public: only active jobs
    let query = Job.find({ status: "active" });

    if (req.query.limit) {
      query = query.limit(parseInt(req.query.limit));
    }

    const jobs = await query.sort({ createdAt: -1 });
    res.json(jobs);
  } catch (err) {
    console.log("Get jobs error:", err);
    res.status(500).json({ msg: "Server error" });
  }
};

/* ------------------------------------------------------
   GET JOB BY ID (PUBLIC)
   -> allow admin to fetch closed jobs if authenticated (handled by route)
------------------------------------------------------ */
export const getJob = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);

    if (!job) return res.status(404).json({ msg: "Job not found" });

    // If request is public (no admin query param) block non-active
    if (!req.query.allowClosed && job.status !== "active") {
      return res.status(410).json({
        msg: "This job is no longer accepting applications.",
        closed: true
      });
    }

    res.json(job);
  } catch (err) {
    console.log("Get job error:", err);
    res.status(500).json({ msg: "Server error" });
  }
};

/* ------------------------------------------------------
   UPDATE JOB (ADMIN)
------------------------------------------------------ */
export const updateJob = async (req, res) => {
  try {
    let updates = { ...req.body };

    // Parse eligibility
    if (updates.eligibility && typeof updates.eligibility === "string") {
      try {
        updates.eligibility = JSON.parse(updates.eligibility);
      } catch {
        updates.eligibility = {};
      }
    }

    // Convert lastDate
    if (updates.lastDate) {
      const d = new Date(updates.lastDate);
      if (!isNaN(d.getTime())) updates.lastDate = d;
    }

    // Fetch old job to check if PDF exists
    const existing = await Job.findById(req.params.id);

    // Handle delete PDF request
    if (updates.removePdf === "true" || updates.removePdf === true) {
      if (existing.notificationPdf) {
        const filePath = `.${existing.notificationPdf}`;
        try { fs.unlinkSync(filePath); } catch (err) {}
      }
      updates.notificationPdf = null;
    }

    // Handle new PDF upload
    if (req.file) {
      updates.notificationPdf = `/uploads/pdfs/${req.file.filename}`;
    }

    const job = await Job.findByIdAndUpdate(req.params.id, updates, {
      new: true
    });

    res.json(job);
  } catch (err) {
    console.log("Update job error:", err);
    res.status(500).json({ msg: "Server error" });
  }
};


/* ------------------------------------------------------
   ADMIN: Get all jobs (no filtering)
------------------------------------------------------ */
export const getAllJobsForAdmin = async (req, res) => {
  try {
    const jobs = await Job.find({}).sort({ createdAt: -1 });
    res.json(jobs);
  } catch (err) {
    console.log("Admin Get ALL jobs error:", err);
    res.status(500).json({ msg: "Server error" });
  }
};

/* ------------------------------------------------------
   CHANGE JOB STATUS (ADMIN)
   -> body: { status: "active" | "closed" | "expired" }
------------------------------------------------------ */
export const updateJobStatus = async (req, res) => {
  try {
    const { status } = req.body;
    if (!["active", "closed", "expired"].includes(status)) {
      return res.status(400).json({ msg: "Invalid status value" });
    }

    const job = await Job.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    res.json(job);
  } catch (err) {
    console.log("Status change error:", err);
    res.status(500).json({ msg: "Server error" });
  }
};

/* ------------------------------------------------------
   DELETE JOB (ADMIN)
------------------------------------------------------ */
export const deleteJob = async (req, res) => {
  try {
    await Job.findByIdAndDelete(req.params.id);
    res.json({ msg: "Deleted" });
  } catch (err) {
    console.log("Delete job error:", err);
    res.status(500).json({ msg: "Server error" });
  }
};

/* ------------------------------------------------------
   Filter jobs by candidate eligibility
------------------------------------------------------ */
export const filterJobs = async (req, res) => {
  try {
    const raw = req.body || {};

    const age = raw.age ? Number(raw.age) : null;
    const ssc = raw.ssc ? Number(raw.ssc) : null;
    const hsc = raw.hsc ? Number(raw.hsc) : null;
    const graduationScore = raw.graduationScore ? Number(raw.graduationScore) : null;
    const experience = raw.experience ? Number(raw.experience) : null;

    const and = [];

    if (age !== null && !isNaN(age)) {
      and.push({ $or: [{ "eligibility.minAge": { $exists: false } }, { "eligibility.minAge": { $lte: age } }]});
      and.push({ $or: [{ "eligibility.maxAge": { $exists: false } }, { "eligibility.maxAge": { $gte: age } }]});
    }

    if (ssc !== null && !isNaN(ssc)) {
      and.push({ $or: [{ "eligibility.minSSC": { $exists: false } }, { "eligibility.minSSC": { $lte: ssc } }]});
    }

    if (hsc !== null && !isNaN(hsc)) {
      and.push({ $or: [{ "eligibility.minHSC": { $exists: false } }, { "eligibility.minHSC": { $lte: hsc } }]});
    }

    if (graduationScore !== null && !isNaN(graduationScore)) {
      and.push({ $or: [{ "eligibility.minGraduationScore": { $exists: false } }, { "eligibility.minGraduationScore": { $lte: graduationScore } }]});
    }

    if (experience !== null && !isNaN(experience)) {
      and.push({ $or: [{ "eligibility.experienceRequired": { $exists: false } }, { "eligibility.experienceRequired": { $lte: experience } }]});
    }

    const base = { status: "active" };
    let finalQuery = base;
    if (and.length > 0) finalQuery = { ...base, $and: and };

    const jobs = await Job.find(finalQuery).sort({ createdAt: -1 });
    res.json(jobs);
  } catch (err) {
    console.error("Filter job error:", err);
    res.status(500).json({ msg: "Server error" });
  }
};
