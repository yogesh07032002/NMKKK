import express from "express";
import { registerUser, loginUser } from "../controllers/userAuthController.js";
// import { getAllUser } from "../controllers/User/getAllUser.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
// router.get('/get',getAllUser)

export default router;
