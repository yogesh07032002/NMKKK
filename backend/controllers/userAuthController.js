import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// =====================
// USER REGISTER
// =====================
export const registerUser = async (req, res) => {
  try {
    const { name, email, password, mobile, department, address } = req.body;

    // Basic validation
    if (!name || !email || !password || !mobile || !department || !address?.state || !address?.city) {
      return res.status(400).json({ msg: "All fields are required" });
    }

    // Email format validation
    if (!/^\S+@\S+\.\S+$/.test(email)) {
      return res.status(400).json({ msg: "Invalid email format" });
    }

    // Mobile number validation
    if (!/^[6-9]\d{9}$/.test(mobile)) {
      return res.status(400).json({ msg: "Enter valid 10-digit mobile number" });
    }

    // Check duplicates
    if (await User.findOne({ email })) {
      return res.status(400).json({ msg: "Email already registered" });
    }

    if (await User.findOne({ mobile })) {
      return res.status(400).json({ msg: "Mobile already registered" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const user = await User.create({
      name,
      email,
      mobile,
      password: hashedPassword,
      role: "user",
      department,
      address: {
        state: address.state,
        city: address.city
      }
    });

    // Generate token
    const token = jwt.sign(
      { id: user._id, role: "user" },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    // Return user info
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
        profilePic: user.profilePic || ""
      }
    });

  } catch (err) {
    console.error("Register error:", err);
    if (err.name === "ValidationError") {
      const messages = Object.values(err.errors).map(v => v.message);
      return res.status(400).json({ msg: messages.join(", ") });
    }
    res.status(500).json({ msg: "Server error" });
  }
};

// =====================
// USER LOGIN
// =====================
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Basic validation
    if (!email || !password) {
      return res.status(400).json({ msg: "Email and password are required" });
    }

    // Find user
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ msg: "Invalid credentials" });

    if (user.role !== "user") {
      return res.status(403).json({ msg: "Access denied: Admins cannot log in here" });
    }

    // Compare password
    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) return res.status(400).json({ msg: "Invalid credentials" });

    // Generate token
    const token = jwt.sign(
      { id: user._id, role: "user" },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    // Return user info
    res.json({
      msg: "Login successful",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        mobile: user.mobile,
        department: user.department,
        address: user.address,
        role: user.role,
        profilePic: user.profilePic || ""
      }
    });

  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ msg: "Server error" });
  }
};
