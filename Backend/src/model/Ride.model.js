import mongoose from "mongoose";

const rideSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "User ID is required"],
    },
    captain: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    pickup: {
      type: String,
      required: [true, "Pickup location is required"],
      trim: true,
    },
    destination: {
      type: String,
      required: [true, "Destination location is required"],
      trim: true,
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
    signature: {
      type: String,
    },
  },
  {
    timestamps: true, // Adds createdAt and updatedAt fields automatically
  }
);

const RideModel = mongoose.model("Ride", rideSchema);
export default RideModel;
