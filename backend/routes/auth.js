import express from "express";
import {
  adminLogin,
  getProfile,
  changeAdminPassword,
  updateAdminProfile,
  uploadAdminPhoto,
  removeAdminPhoto
} from "../controllers/authController.js";

import {
  registerUser,
  loginUser
} from "../controllers/userAuthController.js";

import auth from "../middleware/auth.js";
import admin from "../middleware/admin.js";
import upload from "../middleware/upload.js";
import { getAllUser } from "../../backend/controllers/User/getAllUser.js";

const router = express.Router();

/* -------------------------------
   USER AUTH
------------------------------- */
router.post("/register", registerUser);
router.post("/login", loginUser);

/* -------------------------------
   ADMIN LOGIN
------------------------------- */
router.post("/admin/login", adminLogin);

/* -------------------------------
   ANY LOGGED USER (user/admin)
------------------------------- */
router.get("/me", auth, getProfile);

// fetch user list
router.get("/get-list",getAllUser)

/* -------------------------------
   ADMIN ONLY ACTIONS
------------------------------- */
router.post("/admin/change-password", auth, admin, changeAdminPassword);
router.put("/admin/update-profile", auth, admin, updateAdminProfile);

router.post(
  "/admin/upload-photo",
  auth,
  admin,
  upload.single("photo"),
  uploadAdminPhoto
);

router.delete("/admin/remove-photo", auth, admin, removeAdminPhoto);

export default router;
