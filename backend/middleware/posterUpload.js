import multer from "multer";
import path from "path";
import fs from "fs";

// Ensure folder exists
const dir = "./uploads/posters";
if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/posters");
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const name = "poster_" + Date.now() + ext;
    cb(null, name);
  }
});

const upload = multer({ storage });

export default upload;
