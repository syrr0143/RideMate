import {
  calculateDistanceAndETA,
  fetchCoordinatesFromAddress,
  fetchSuggestions,
} from "../services/map.service.js";
import { AppError } from "../utils/errorHandler.utils.js";
import CaptainModel from "../model/Captain.model.js";
// Controller for getting coordinates
const getCoordinates = async (req, res, next) => {
  const { address } = req.body;

  if (!address) {
    return res.status(400).json({ error: "Address is required" });
  }

  try {
    const locationData = await fetchCoordinatesFromAddress(address);

    return res.json(locationData);
  } catch (error) {
    console.error("Error in getCoordinates:", error.message);
    if (error instanceof AppError) {
      return next(error);
    }
    return next(new AppError("Internal server error", 500));
  }
};

const getDistanceAndETA = async (req, res, next) => {
  const { origin, destination } = req.body;

  if (!origin || !destination) {
    return res
      .status(400)
      .json({ error: "Both origin and destination are required" });
  }

  try {
    const originCoords = await fetchCoordinatesFromAddress(origin);
    const destinationCoords = await fetchCoordinatesFromAddress(destination);

    if (!originCoords || !destinationCoords) {
      return res.status(404).json({ error: "One or both locations not found" });
    }

    const distanceETA = await calculateDistanceAndETA(
      originCoords,
      destinationCoords
    );

    return res.json(distanceETA);
  } catch (error) {
    console.error("Error in getDistanceAndETA:", error.message);
    if (error instanceof AppError) {
      return next(error);
    }
    return next(new AppError("Internal server error", 500));
  }
};

const getSuggestions = async (req, res, next) => {
  const { query } = req.body;

  if (!query) {
    return res.status(400).json({ error: "Query parameter is required" });
  }

  try {
    const suggestions = await fetchSuggestions(query);

    if (!suggestions || suggestions.length === 0) {
      return res.status(404).json({ error: "No suggestions found" });
    }

    return res.json(suggestions);
  } catch (error) {
    console.error("Error in getSuggestions:", error.message);
    if (error instanceof AppError) {
      return next(error);
    }
    return next(new AppError("Internal server error", 500));
  }
};

export { getCoordinates, getDistanceAndETA, getSuggestions };
