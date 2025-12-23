import express from "express";
import posterUpload from "../middleware/posterUpload.js";

import {
  getAllPosters,
  createPoster,
  updatePoster,
  deletePoster
} from "../controllers/posterController.js";

const router = express.Router();

router.get("/", getAllPosters);

router.post("/", posterUpload.single("image"), createPoster);

router.put("/:id", posterUpload.single("image"), updatePoster);

router.delete("/:id", deletePoster);

export default router;
