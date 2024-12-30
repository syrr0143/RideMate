import mongoose from "mongoose";

const rideSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: [true, "User ID is required"],
    },
    captain: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "captain",
    },
    pickup: {
      type: String,
      required: [true, "Pickup location is required"],
      trim: true,
    },
    pickupCoords: {
      type: [Number],
    },
    destination: {
      type: String,
      required: [true, "Destination location is required"],
      trim: true,
    },
    destinationCoords: {
      type: [Number],
    },
    fare: {
      type: Number,
      required: [true, "Fare amount is required"],
      min: [0, "Fare must be a positive value"],
    },
    status: {
      type: String,
      enum: {
        values: ["pending", "accepted", "completed", "cancelled"],
        message:
          "Status must be either 'pending', 'accepted', 'completed', or 'cancelled'",
      },
      default: "pending",
    },
    duration: {
      type: Number, // Assuming duration is in minutes
    },
    distance: {
      type: Number, // Assuming distance is in meter
    },
    paymentId: {
      type: String,
    },
    orderId: {
      type: String,
    },
    otp: {
      type: String,
      select: false,
    },
    signature: {
      type: String,
    },
  },
  {
    timestamps: true, // Adds createdAt and updatedAt fields automatically
  }
);

const RideModel = mongoose.model("ride", rideSchema);
export default RideModel;
