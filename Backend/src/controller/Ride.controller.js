import { z } from "zod";
import { AppError } from "../utils/errorHandler.utils.js";
import rideValidation from "../validations/Ride.validations.js";
import {
  createRide,
  RideFares,
  confirmRideByCaptainService,
  checkOtp,
} from "../services/Ride.service.js";
import {
  calculateDistanceAndETA,
  fetchCoordinatesFromAddress,
  getCaptainsWithinRadius,
} from "../services/map.service.js";
import { sendMessageToSocketId } from "../socket.js";
import RideModel from "../model/Ride.model.js";
import CaptainModel from "../model/Captain.model.js";

const RideCreateController = async (req, res, next) => {
  try {
    const userId = req.user.userId;
    const validatedData = rideValidation.parse(req.body);
    const { pickup, destination, vehicleType } = validatedData;
    const originCoords = await fetchCoordinatesFromAddress(pickup);
    const destinationCoords = await fetchCoordinatesFromAddress(destination);

    if (!originCoords || !destinationCoords) {
      return res.status(404).json({ error: "One or both locations not found" });
    }

    const formattedPickupCoords = [
      originCoords.latitude,
      originCoords.longitude,
    ];

    const formattedDestinationCoords = [
      destinationCoords.latitude,
      destinationCoords.longitude,
    ];
    const distanceETA = await calculateDistanceAndETA(
      originCoords,
      destinationCoords
    );
    const distanceCalculated = parseFloat(distanceETA.distance);
    const timeCalculated = parseFloat(distanceETA.eta);

    const newRide = await createRide({
      userId,
      pickup,
      pickupCoords: formattedPickupCoords,
      destination,
      destinationCoords: formattedDestinationCoords,
      vehicleType,
      distance: distanceCalculated,
      duration: timeCalculated,
    });
    const { latitude: destLat, longitude: destLng } = originCoords;

    const captainInRadius = await getCaptainsWithinRadius(
      destLat,
      destLng,
      20000
    );
    res.status(201).json({
      sucess: true,
      ride: newRide,
      message: "Ride is created successfully",
    });
    newRide.otp = "";

    const newRideWithUserDetails = await RideModel.findOne({
      _id: newRide._id,
    }).populate("userId");
    captainInRadius.map(async (captain) => {
      console.log("emiting new ride to captain", captain?.socketId);
      console.log("Sending to socketId:", captain?.socketId);
      console.log("Data being sent:", newRideWithUserDetails);

      sendMessageToSocketId(captain?.socketId, {
        event: "new-ride",
        data: newRideWithUserDetails,
      });
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return next(new AppError(error.errors[0].message, 400));
    }
    if (error instanceof AppError) {
      return next(error);
    }
    console.error("Unexpected error:", error.message);
    return next(new AppError("Internal server error", 500));
  }
};

const AllRideFare = async (req, res, next) => {
  try {
    const { source, destination } = req.body;
    const originCoords = await fetchCoordinatesFromAddress(source);
    const destinationCoords = await fetchCoordinatesFromAddress(destination);

    if (!originCoords || !destinationCoords) {
      return res.status(404).json({ error: "One or both locations not found" });
    }

    const distanceETA = await calculateDistanceAndETA(
      originCoords,
      destinationCoords
    );
    const distanceCalculated = parseFloat(distanceETA.distance);
    const timeCalculated = parseFloat(distanceETA.eta);
    const fares = await RideFares(distanceCalculated, timeCalculated);
    return res.status(201).json({
      sucess: true,
      fares: fares,
      eta: timeCalculated,
      message: "fares fetched successfully",
    });
  } catch (error) {
    if (error instanceof AppError) {
      return next(error);
    }
    console.error("Unexpected error from allride controller:", error.message);
    return next(new AppError("Internal server error", 500));
  }
};

const confirmRideByCaptain = async (req, res, next) => {
  try {
    const { rideId } = req.body;
    const { userId } = req.captain;
    if (!rideId) {
      return res
        .status(404)
        .json({ error: "rideid is required to confirm the ride " });
    }
    const ride = await confirmRideByCaptainService(rideId, userId); // confirmimg the ride from captain end
    sendMessageToSocketId(ride.userId.socketId, {
      event: "ride-confirmed",
      data: ride,
    });

    return res.status(200).json({
      sucess: true,
      ride: ride,
      message: "ride confirmed successfully",
    });
  } catch (error) {
    if (error instanceof AppError) {
      return next(error);
    }
    console.error(
      "Unexpected error from confirm ride by captain controller:",
      error.message
    );
    return next(new AppError("Internal server error", 500));
  }
};
const getAllRideAvailable = async (req, res, next) => {
  try {
    const rideAvailable = await RideModel.find({ status: "pending" });

    return res.status(200).json({
      sucess: true,
      rideAvailable: rideAvailable,
      message: "ride found successfully",
    });
  } catch (error) {
    if (error instanceof AppError) {
      return next(error);
    }
    console.error("Unexpected error from ride founding:", error.message);
    return next(new AppError("Internal server error", 500));
  }
};

const confirmRideByOtp = async (req, res, next) => {
  try {
    const { rideId, otp } = req.body;
    const { userId } = req.captain;
    let rideData = await checkOtp(rideId, otp);
    const captain = await CaptainModel.findById(userId);
    captain.earning += parseInt(rideData?.fare);
    captain.distanceCovered += parseInt(rideData?.distance);
    captain.timeSpent += parseInt(rideData?.duration);
    captain.averageSpeed +=
      (captain.distanceCovered + parseInt(rideData?.distance)) /
      (captain.timeSpent + parseInt(rideData?.duration));
    await captain.save();
    sendMessageToSocketId(rideData.userId.socketId, {
      event: "otp-success",
      data: rideData,
    });

    return res.status(200).json({
      sucess: true,
      message: "otp verification successfully",
    });
  } catch (error) {
    if (error instanceof AppError) {
      return next(error);
    }
    console.error("Unexpected error from ride founding:", error.message);
    return next(new AppError("Internal server error", 500));
  }
};

async function finishRide(req, res, next) {
  try {
    const { rideId } = req.body;
    const ride = await RideModel.findById(rideId).populate("userId");
    if (!ride) {
      return res.status(404).json({
        success: false,
        message: "No ride with this id found",
      });
    }
    ride.status = "completed";
    await ride.save();
    console.log("ride is ", ride?.userId.socketId);
    sendMessageToSocketId(ride?.userId.socketId, {
      event: "ride-completed",
      data: "ride completed",
    });

    return res.status(200).json({
      success: true,
      message: "Ride completed success",
    });
  } catch (error) {
    if (error instanceof AppError) {
      return next(error);
    }
    console.error("Unexpected error from ride founding:", error.message);
    return next(new AppError("Internal server error", 500));
  }
}

export {
  RideCreateController,
  AllRideFare,
  confirmRideByCaptain,
  getAllRideAvailable,
  confirmRideByOtp,
  finishRide,
};
