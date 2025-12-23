import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

// =====================
// JWT GENERATOR
// =====================
const generateToken = (id, role = "user") => {
  return jwt.sign({ id, role }, process.env.JWT_SECRET, { expiresIn: "7d" });
};

// =====================
// REGISTER USER
// =====================
export const register = async (req, res) => {
  try {
    const { name, email, password, mobile, department, address } = req.body;

    // Required fields
    if (!name || !email || !password || !mobile || !department || !address?.state || !address?.city) {
      return res.status(400).json({ msg: "All fields are required" });
    }

    // Check duplicates
    if (await User.findOne({ email })) return res.status(400).json({ msg: "Email already registered" });
    if (await User.findOne({ mobile })) return res.status(400).json({ msg: "Mobile already registered" });

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      mobile,
      department,
      role: "user",
      address: {
        state: address.state,
        city: address.city
      }
    });

    // Generate token
    const token = generateToken(user._id, "user");

    res.status(201).json({
      msg: "User registered successfully",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        mobile: user.mobile,
        department: user.department,
        address: user.address,
        role: user.role,
        profilePic: user.profilePic
      }
    });
  } catch (err) {
    console.error("REGISTER ERROR:", err);
    if (err.name === "ValidationError") {
      const messages = Object.values(err.errors).map(v => v.message);
      return res.status(400).json({ msg: messages.join(", ") });
    }
    res.status(500).json({ msg: "Server error" });
  }
};

// =====================
// LOGIN USER
// =====================
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user || user.role !== "user") return res.status(400).json({ msg: "Invalid credentials" });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(400).json({ msg: "Invalid credentials" });

    const token = generateToken(user._id, "user");

    res.json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        mobile: user.mobile,
        department: user.department,
        address: user.address,
        role: user.role,
        profilePic: user.profilePic
      }
    });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ msg: "Server error" });
  }
};

// =====================
// ADMIN LOGIN
// =====================
export const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const admin = await User.findOne({ email, role: "admin" });
    if (!admin) return res.status(400).json({ msg: "Admin not found" });

    const match = await bcrypt.compare(password, admin.password);
    if (!match) return res.status(400).json({ msg: "Invalid password" });

    const token = generateToken(admin._id, "admin");

    res.json({
      token,
      user: {
        id: admin._id,
        name: admin.name,
        email: admin.email,
        role: admin.role,
        profilePic: admin.profilePic
      }
    });
  } catch (err) {
    console.error("Admin login error:", err);
    res.status(500).json({ msg: "Server error" });
  }
};

// =====================
// GET PROFILE
// =====================
export const getProfile = async (req, res) => {
  res.json({
    id: req.user._id,
    name: req.user.name,
    email: req.user.email,
    mobile: req.user.mobile,
    department: req.user.department,
    address: req.user.address,
    role: req.user.role,
    profilePic: req.user.profilePic || ""
  });
};

// =====================
// CHANGE ADMIN PASSWORD
// =====================
export const changeAdminPassword = async (req, res) => {
  try {
    const { oldPassword, newPassword } = req.body;
    const admin = await User.findById(req.user._id);
    if (!admin) return res.status(404).json({ msg: "Admin not found" });

    const match = await bcrypt.compare(oldPassword, admin.password);
    if (!match) return res.status(400).json({ msg: "Incorrect old password" });

    admin.password = await bcrypt.hash(newPassword, 10);
    await admin.save();

    res.json({ msg: "Password updated successfully" });
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
};

// =====================
// UPDATE ADMIN PROFILE
// =====================
export const updateAdminProfile = async (req, res) => {
  try {
    const { name, email } = req.body;
    const admin = await User.findById(req.user._id);
    if (!admin) return res.status(404).json({ msg: "Admin not found" });

    admin.name = name || admin.name;
    admin.email = email || admin.email;
    await admin.save();

    res.json({
      id: admin._id,
      name: admin.name,
      email: admin.email,
      role: admin.role
    });
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
};

// =====================
// UPLOAD ADMIN PHOTO
// =====================
export const uploadAdminPhoto = async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ msg: "No file uploaded" });

    const admin = await User.findById(req.user._id);
    if (!admin) return res.status(404).json({ msg: "Admin not found" });

    admin.profilePic = `/uploads/profile/${req.file.filename}`;
    await admin.save();

    res.json({ msg: "Profile photo updated", profilePic: admin.profilePic });
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
};

// =====================
// REMOVE ADMIN PHOTO
// =====================
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const removeAdminPhoto = async (req, res) => {
  try {
    const admin = await User.findById(req.user._id);
    if (!admin) return res.status(404).json({ msg: "Admin not found" });

    if (admin.profilePic) {
      const oldPath = path.join(__dirname, "..", admin.profilePic);
      fs.unlink(oldPath, () => {});
    }

    admin.profilePic = "";
    await admin.save();

    res.json({ msg: "Profile picture removed", profilePic: "" });
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
};
