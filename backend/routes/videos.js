import express from "express";
import {
  createVideo,
  getVideos,
  deleteVideo,
  updateVideo
} from "../controllers/videoController.js";

import auth from "../middleware/auth.js";
import admin from "../middleware/admin.js";

const router = express.Router();

// public
router.get("/", getVideos);

// admin actions
router.post("/", auth, admin, createVideo); // { title, url, description }
router.put("/:id", auth, admin, updateVideo);
router.delete("/:id", auth, admin, deleteVideo);

export default router;
