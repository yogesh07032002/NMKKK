import express from "express";
import auth from "../middleware/auth.js";
import admin from "../middleware/admin.js";
import {
  createNotification,
  getAllNotifications,
  getActiveNotifications,
  updateNotification,
  deleteNotification
} from "../controllers/notificationController.js";

const router = express.Router();

// PUBLIC
router.get("/active", getActiveNotifications);

// ADMIN ONLY
router.post("/", auth, admin, createNotification);
router.get("/", auth, admin, getAllNotifications);
router.put("/:id", auth, admin, updateNotification);
router.delete("/:id", auth, admin, deleteNotification);

export default router;
