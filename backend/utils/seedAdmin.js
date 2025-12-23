import bcrypt from "bcryptjs";
import User from "../models/User.js";

export const seedAdmin = async () => {
  try {
    const email = "admin@nmk.com";
    const exists = await User.findOne({ role: "admin" });

    if (exists) {
      console.log("Admin already exists.");
      return;
    }

    const hashed = await bcrypt.hash("Admin@123", 10);

    await User.create({
      name: "NMK Admin",
      email,
      password: hashed,
      role: "admin"
    });

    console.log("⭐ Admin Created:");
    console.log("Email: admin@nmk.com");
    console.log("Password: Admin@123");
  } catch (err) {
    console.error("Admin seeding error:", err);
  }
};
