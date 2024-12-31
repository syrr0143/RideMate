import RideModel from "../model/Ride.model.js";
import { calculateFare, generateOtp } from "../utils/ride.utils.js";
import { AppError } from "../utils/errorHandler.utils.js";

async function createRide({
  userId,
  pickup,
  pickupCoords,
  destination,
  destinationCoords,
  vehicleType,
  distance,
  duration,
}) {
  try {
    const isRideActive = await RideModel.findOne({
      userId,
      status: { $in: ["pending", "accepted", "in-progress"] },
    });

    if (!isRideActive) {
      throw new AppError(
        `User already has an active ride. Complete or cancel the ongoing ride before creating a new one.`,
        404
      );
    }
    const allFareOption = calculateFare(distance, duration);
    const otp = generateOtp();

    console.log("pickupCoords", pickupCoords);
    const newRide = {
      userId,
      pickup: pickup,
      pickupCoords: pickupCoords,
      destination: destination,
      destinationCoords: destinationCoords,
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
    console.error(
      "Error calculating the fare for the ride from service:",
      error.message
    );
    if (error instanceof AppError) {
      throw error;
    }
    throw new AppError(error.message || "Internal server error");
  }
}
async function confirmRideByCaptainService(rideId, captainId) {
  try {
    await RideModel.findOneAndUpdate(
      { _id: rideId },
      {
        status: "accepted",
        captain: captainId,
      }
    );
    const ride = await RideModel.findOne({ _id: rideId })
      .populate("userId")
      .populate("captain");
    if (!ride) {
      throw new AppError(`no ride with this id available.`, 404);
    }

    return ride;
  } catch (error) {
    console.error(
      "Error calculating the fare for the ride from service:",
      error.message
    );
    if (error instanceof AppError) {
      throw error;
    }
    throw new AppError(error.message || "Internal server error");
  }
}

async function checkOtp(rideId, otp) {
  try {
    const ride = await RideModel.findById(rideId)
      .select("+otp")
      .populate("userId");
    if (!ride) {
      throw new AppError(`no ride with this id available.`, 404);
    }
    if (otp != ride?.otp) {
      console.log("ride otp and otp is ", ride?.otp, otp, ride);
      throw new AppError(`invalid otp.`, 401);
    }
    ride.status = "accepted";
    await ride.save();

    return ride;
  } catch (error) {
    console.error("Error checking the otp:", error.message);
    if (error instanceof AppError) {
      throw error;
    }
    throw new AppError(error.message || "Internal server error");
  }
}

export { createRide, RideFares, confirmRideByCaptainService, checkOtp };
