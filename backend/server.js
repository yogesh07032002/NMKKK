import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";
import connectDB from "./config.js";
import authRoutes from "./routes/auth.js";
import jobRoutes from "./routes/jobs.js";
import { seedAdmin } from "./utils/seedAdmin.js";
import notificationRoutes from "./routes/notifications.js";
import centerRoutes from "./routes/centers.js";
import userAuthRoutes from "./routes/userAuth.js";
import videosRouter from "./routes/videos.js";
import posters from "./routes/posters.js";

dotenv.config();

const app = express();
connectDB();

// auto seed admin
import mongoose from "mongoose";
mongoose.connection.once("open", () => {
  seedAdmin();
});

app.use(cors());
app.use(express.json());

app.use("/api/users", userAuthRoutes);

// serve uploads
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use("/api/notifications", notificationRoutes);

// routes
app.use("/api/auth", authRoutes);
app.use("/api/jobs", jobRoutes);
app.use("/api/centers", centerRoutes);
app.use("/api/videos", videosRouter);
app.use("/api/posters", posters);

app.get("/", (req, res) => res.send("NMK Jobs API running"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
