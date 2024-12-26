import RideModel from "../model/Ride.model.js";
import { calculateFare, generateOtp } from "../utils/ride.utils.js";
import { AppError } from "../utils/errorHandler.utils.js";

async function createRide({
  userId,
  pickup,
  destination,
  vehicleType,
  distance,
  duration,
}) {
  try {
    const isRideActive = await RideModel.findOne({
      userId,
      status: { $in: ["pending", "accepted", "in-progress"] },
    });
    if (isRideActive) {
      throw new AppError(
        `User already has an active ride. Complete or cancel the ongoing ride before creating a new one.`,
        404
      );
    }
    const allFareOption = calculateFare(distance, duration);
    const otp = generateOtp();
    const newRide = {
      userId,
      pickup: pickup,
      destination: destination,
      fare: allFareOption[vehicleType],
      vehicleType: vehicleType,
      duration: duration,
      distance: distance,
      otp: otp,
    };
  
    const savedRide = await RideModel.create(newRide);
    return savedRide;
  } catch (error) {
    console.error("Error creating the ride from service:", error.message);
    if (error instanceof AppError) {
      throw error;
    }
    throw new AppError(error.message || "Internal server error");
  }
}

async function RideFares(distance, duration) {
  try {
    const allFareOption = calculateFare(distance, duration);
    return allFareOption;
  } catch (error) {
    console.error("Error calculating the fare for the ride from service:", error.message);
    if (error instanceof AppError) {
      throw error;
    }
    throw new AppError(error.message || "Internal server error");
  }
}

export { createRide, RideFares };
