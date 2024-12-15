import { z } from "zod";

import {
  authTokenOption,
  refreshTokenOptions,
} from "../config/cookie.config.js";
import captainValidationSchema from "../validations/captain.validations.js";
import {
  createCaptain,
  deleteCaptainByEmail,
  deleteCaptainById,
  findCaptainByEmail,
  findCaptainById,
} from "../services/captain.service.js";
import { AppError } from "../utils/errorHandler.utils.js";
import { comparePassword } from "../utils/security.utils.js";
import { generateToken } from "../utils/auth.utils.js";

const signUpCaptain = async (req, res, next) => {
  try {
    const validatedData = captainValidationSchema.parse(req.body);

    const { fullName, email, password, vehicle } = validatedData;
    const { color, capacity, numberPlate, vehicleType } = vehicle;
    const newCaptain = await createCaptain({
      fullName,
      email,
      password,
      color,
      capacity,
      numberPlate,
      vehicleType,
    });
    return res.status(201).json({
      sucess: true,
      message: "captain is created successfully",
      captain: newCaptain,
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
const loginCaptain = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const captainFound = await findCaptainByEmail(email);
    if (!captainFound) {
      throw new AppError("Invalid credentials", 401);
    }
    const hashedPassword = captainFound.password;
    const passwordMatch = await comparePassword(password, hashedPassword);
    if (!passwordMatch) {
      throw new AppError("Invalid credentials", 401);
    }
    const authToken = await generateToken(captainFound._id, "auth");
    const refreshToken = await generateToken(captainFound._id, "refresh");
    captainFound.refreshToken = refreshToken;
    await captainFound.save();
    res.cookie("token", authToken, authTokenOption);
    return res.status(200).json({
      sucess: true,
      message: "captain logged in successfully",
      captain: {
        _id: captainFound._id,
        fullName: captainFound.fullName,
        email: captainFound.email,
        vehicle: captainFound.vehicle,
        token: authToken,
      },
    });
  } catch (error) {
    if (error instanceof AppError) {
      return next(error);
    }
    next(new AppError("Internal server error", 500));
  }
};

const captainProfile = async (req, res, next) => {
  try {
    const { userId } = req.captain;
    const captainFound = await findCaptainById(userId);
    return res.status(200).json({
      success: true,
      message: "captain profile obtaoned",
      captain: {
        _id: captainFound._id,
        fullName: captainFound.fullName,
        email: captainFound.email,
        vehicle: captainFound.vehicle,
        location: captainFound?.location,
      },
    });
  } catch (error) {
    if (error instanceof AppError) {
      return next(error);
    }
    next(new AppError("Internal server error", 500));
  }
};

const logOutCaptain = async (req, res, next) => {
  try {
    const { userId } = req.captain;
    const captainFound = await findCaptainById(userId);
    if (!captainFound) {
      throw new AppError("unauthorised access", 401);
    }
    captainFound.refreshToken = "";
    await captainFound.save();

    res.cookie("token", "", { ...authTokenOption, maxAge: 0 }); // setting token expiry immediate manualy
    return res.status(200).json({
      sucess: true,
      message: "captain logout successfully",
    });
  } catch (error) {
    if (error instanceof AppError) {
      return next(error);
    }
    next(new AppError("Internal server error", 500));
  }
};

export { signUpCaptain, loginCaptain, captainProfile, logOutCaptain };
