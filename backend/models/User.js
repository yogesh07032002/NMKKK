import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    name: { type: String, required: [true, "Name is required"] },

    email: { type: String, required: [true, "Email is required"], unique: true },

    password: { type: String, required: [true, "Password is required"] },

    role: { type: String, enum: ["user", "admin"], default: "user" },

    profilePic: { type: String, default: "" },

    department: { type: String, required: [true, "Department is required"] },

    mobile: {
      type: String,
      required: [true, "Mobile is required"],
      unique: true,
      match: [/^[6-9]\d{9}$/, "Invalid mobile number"]
    },

    address: {
      _id: false,
      state: { type: String, required: [true, "State is required"] },
      city: { type: String, required: [true, "City is required"] }
    }
  },
  { timestamps: true }
);

export default mongoose.model("User", UserSchema);
