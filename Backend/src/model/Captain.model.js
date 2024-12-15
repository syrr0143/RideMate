import mongoose from "mongoose";

const vehicleSchema = new mongoose.Schema({
  color: {
    type: String,
    required: [true, "Vehicle color is required"],
    trim: true,
  },
  numberPlate: {
    type: String,
    required: [true, "Vehicle number plate is required"],
    unique: true,
    trim: true,
  },
  capacity: {
    type: Number,
    required: [true, "Vehicle capacity is required"],
    min: [1, "Vehicle capacity must be at least 1"],
  },
  vehicleType: {
    type: String,
    enum: {
      values: ["car", "bike", "auto"],
      message: "Vehicle type must be either 'car', 'bike', or 'auto'",
    },
    required: [true, "Vehicle type is required"],
  },
});

const locationSchema = new mongoose.Schema({
  latitude: {
    type: Number,
    // required: [true, "Latitude is required"],
  },
  longitude: {
    type: Number,
    // required: [true, "Longitude is required"],
  },
});

const captainSchema = mongoose.Schema(
  {
    fullName: {
      type: String,
      required: [true, "full name of captain is required"],
      trim: true,
      lowercase: true,
      minlength: [3, "Full name should be at least 8 characters long"],
    },
    email: {
      type: String,
      required: [true, "full name of captain is required"],
      unique: [true, "email should be unique"],
      trim: true,
      lowercase: true,
      match: [/^\S+@\S+\.\S+$/, "Please provide a valid email address"],
    },
    password: {
      type: String,
      required: [true, "password is required"],
      minlength: [8, "Full name should be at least 8 characters long"],
      select: false,
    },
    socketId: {
      type: String,
    },
    status: {
      type: String,
      enum: {
        values: ["active", "inActive"],
        message: "Status must be either 'active' or 'inActive'",
      },
      default: "inActive",
    },
    vehicle: vehicleSchema,
    location: locationSchema,
    refreshToken: {
      type: String,
      select: false,
      default: Date.now,
      expires: "30d",
    },
  },
  { timestamps: true }
);

const CaptainModel = mongoose.model("Captain", captainSchema);
export default CaptainModel;
