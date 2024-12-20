import axios from 'axios'
import { AppError } from '../utils/errorHandler.utils.js';

// Service function to fetch coordinates using Mapbox API
const fetchCoordinatesFromAddress = async (address) => {
  const mapboxUrl = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
    address
  )}.json?access_token=${process.env.MAPBOX_API_KEY}`;

  try {
    const response = await axios.get(mapboxUrl);

    if (response.data.features.length === 0) {
      throw new AppError(
        "No location found",
        404
      ); // No location found
    }

    const locationData = response.data.features[0];
    const { center, place_name } = locationData;

    return {
      latitude: center[1],
      longitude: center[0],
      place_name,
    };
  } catch (error) {
    console.error("Error in fetchCoordinatesFromAddress:", error.message);
    if (error instanceof AppError) {
      throw error;
    }
    throw new AppError(error.message || "Internal server error");
  }
};
const calculateDistanceAndETA = async (origin, destination) => {
  const { latitude: originLat, longitude: originLng } = origin;
  const { latitude: destLat, longitude: destLng } = destination;

  const directionsUrl = `https://api.mapbox.com/directions/v5/mapbox/driving/${originLng},${originLat};${destLng},${destLat}?access_token=${process.env.MAPBOX_API_KEY}`;

  try {
    const response = await axios.get(directionsUrl);

    if (!response.data.routes || response.data.routes.length === 0) {
     throw new AppError("No route found", 404); // No route found
    }

    const route = response.data.routes[0];
    const { distance, duration } = route;

    return {
      distance: (distance / 1000).toFixed(2) + " km", // Convert to kilometers
      eta: (duration / 60).toFixed(2) + " mins", // Convert to minutes
    };
  } catch (error) {
    console.error("Error in calculateDistanceAndETA:", error.message);
     if (error instanceof AppError) {
       throw error;
     }
     throw new AppError(error.message || "Internal server error");
  }
};

const fetchSuggestions = async (query) => {
  const mapboxUrl = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
    query
  )}.json?access_token=${process.env.MAPBOX_API_KEY}&autocomplete=true&limit=5`;

  try {
    const response = await axios.get(mapboxUrl);

    if (response.data.features.length === 0) {
     throw new AppError("No match found", 404);
    }

    return response.data.features.map((feature) => ({
      place_name: feature.place_name,
      coordinates: {
        latitude: feature.center[1],
        longitude: feature.center[0],
      },
    }));
  } catch (error) {
    console.error("Error in fetchSuggestions:", error.message);
    if (error instanceof AppError) {
      throw error;
    }
    throw new AppError(error.message || "failed to fetch suggestions");
  }
};

export { fetchCoordinatesFromAddress,calculateDistanceAndETA , fetchSuggestions };
