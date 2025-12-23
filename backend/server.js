import authRoutes from "./routes/auth.js";
import centerRoutes from "./routes/centers.js";
import connectDB from "./config.js";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import { fileURLToPath } from "url";
import jobRoutes from "./routes/jobs.js";
import mongoose from "mongoose";
import notificationRoutes from "./routes/notifications.js";
import path from "path";
import posters from "./routes/posters.js";
import { seedAdmin } from "./utils/seedAdmin.js";
import userAuthRoutes from "./routes/userAuth.js";
import videosRouter from "./routes/videos.js";

dotenv.config();

const app = express();

/* -------------------- Database -------------------- */
connectDB();

mongoose.connection.once("open", () => {
  console.log("MongoDB Connected");
  seedAdmin(); // auto seed admin (safe)
});

/* -------------------- Middleware -------------------- */
app.use(cors({
  origin: "*", // replace with frontend URL in future
  credentials: true,
}));

app.use(express.json());

/* -------------------- Routes -------------------- */
app.use("/api/users", userAuthRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/jobs", jobRoutes);
app.use("/api/notifications", notificationRoutes);
app.use("/api/centers", centerRoutes);
app.use("/api/videos", videosRouter);
app.use("/api/posters", posters);

/* -------------------- Static Uploads -------------------- */
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

/* -------------------- Health Check -------------------- */
app.get("/", (req, res) => {
  res.status(200).send("NMK Jobs API running 🚀");
});

/* -------------------- Server -------------------- */
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
