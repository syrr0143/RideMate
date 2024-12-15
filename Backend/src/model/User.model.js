import mongoose from "mongoose";

const userSchema = mongoose.Schema(
  {
    fullName: {
      type: String,
      minlength: [3, "Full name should be at least 8 characters long"],
      required: [true, "full name is required"],
      trim: true,
      lowercase: true,
    },
    email: {
      type: String,
      unique: [true, "email should be unique"],
      required: [true, "email is required"],
      trim: true,
      lowercase: true,
      match: [/^\S+@\S+\.\S+$/, "Please provide a valid email address"],
    },
    password: {
      type: String,
      required: [true, "password is required"],
      minlength: [8, "password should be at least 8 char long"],
      select: false,
    },
    socketId: {
      type: String,
    },
    refreshToken: {
      type: String,
      select: false,
      default: Date.now,
      expires: "30d",
    },
  },
  { timestamps: true }
);

const userModel = mongoose.model("user", userSchema);
export default userModel;
