// backend/middleware/auth.js
import jwt from "jsonwebtoken";
import User from "../models/User.js";

const auth = async (req, res, next) => {
  try {
    let token = req.header("x-auth-token");

    if (!token) {
      const authHeader = req.header("authorization");
      if (authHeader?.startsWith("Bearer ")) {
        token = authHeader.split(" ")[1];
      }
    }

    if (!token)
      return res.status(401).json({ msg: "No token, authorization denied" });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // UNIVERSAL FIX → handles both admin + user tokens
    const userId = decoded.user?.id || decoded.id;

    if (!userId)
      return res.status(401).json({ msg: "Invalid token structure" });

    const user = await User.findById(userId).select("-password");

    if (!user) return res.status(401).json({ msg: "User not found" });

    req.user = user;

    next();
  } catch (err) {
    console.error("auth middleware:", err);
    res.status(401).json({ msg: "Token is not valid" });
  }
};

export default auth;
