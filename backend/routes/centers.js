import express from "express";
import auth from "../middleware/auth.js";
import admin from "../middleware/admin.js";
import {
  createCenter,
  getCenters,
  updateCenter,
  deleteCenter
} from "../controllers/centerController.js";

const router = express.Router();

// USER + PUBLIC
router.get("/", getCenters);

// ADMIN ONLY
router.post("/", auth, admin, createCenter);
router.put("/:id", auth, admin, updateCenter);
router.delete("/:id", auth, admin, deleteCenter);

export default router;
