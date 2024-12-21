import { z } from "zod";
import { AppError } from "../utils/errorHandler.utils.js";
import rideValidation from "../validations/Ride.validations.js";
import { createRide, RideFares } from "../services/Ride.service.js";
import {
  calculateDistanceAndETA,
  fetchCoordinatesFromAddress,
} from "../services/map.service.js";

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

    const distanceETA = await calculateDistanceAndETA(
      originCoords,
      destinationCoords
    );
    const distanceCalculated = parseFloat(distanceETA.distance);
    const timeCalculated = parseFloat(distanceETA.eta);
    const newRide = await createRide({
      userId,
      pickup,
      destination,
      vehicleType,
      distance: distanceCalculated,
      duration: timeCalculated,
    });
    console.log("newride created is ", newRide);

    return res.status(201).json({
      sucess: true,
      ride: newRide,
      message: "Ride is created successfully",
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

export { RideCreateController, AllRideFare };
