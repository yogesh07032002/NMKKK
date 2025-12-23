import multer from "multer";
import path from "path";
import fs from "fs";

// Ensure directory exists
const dir = "./uploads/pdfs";
if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/pdfs"),
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, "jobpdf_" + Date.now() + ext);
  },
});

const fileFilter = (req, file, cb) => {
  const allowed = ["application/pdf", "application/octet-stream"];
  if (allowed.includes(file.mimetype)) cb(null, true);
  else cb(new Error("Only PDF files allowed"), false);
};

export default multer({ storage, fileFilter });
