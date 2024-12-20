import { z } from "zod";

import {
  authTokenOption,
  refreshTokenOptions,
} from "../config/cookie.config.js";
import userValidationSchema from "../validations/user.validations.js";
import {
  createUser,
  findUserByEmail,
  deleteUserById,
  deleteUserByEmail,
  findUserById,
} from "../services/user.service.js";
import { AppError } from "../utils/errorHandler.utils.js";
import { comparePassword } from "../utils/security.utils.js";
import { generateToken } from "../utils/auth.utils.js";

const signUpUser = async (req, res, next) => {
  try {
    const validatedData = userValidationSchema.parse(req.body);
    const { fullName, email, password } = validatedData;
    const newUser = await createUser({ fullName, email, password });
    return res.status(201).json({
      sucess: true,
      message: "user is created successfully",
      user: newUser,
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
const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const userFound = await findUserByEmail(email);
    if (!userFound) {
      throw new AppError("Invalid credentials", 401);
    }
    const hashedPassword = userFound.password;
    const passwordMatch = await comparePassword(password, hashedPassword);
    if (!passwordMatch) {
      throw new AppError("Invalid credentials", 401);
    }
    const authToken = await generateToken(userFound._id, "user", "auth");
    const refreshToken = await generateToken(userFound._id, "user", "refresh");
    userFound.refreshToken = refreshToken;
    console.log("for user refresh token is ", refreshToken);
    await userFound.save();
    res.cookie("token", authToken, authTokenOption);
    return res.status(200).json({
      sucess: true,
      message: "user logged in successfully",
      user: {
        _id: userFound._id,
        fullName: userFound.fullName,
        email: userFound.email,
        token: authToken,
        role: userFound.role,
      },
    });
  } catch (error) {
    if (error instanceof AppError) {
      return next(error);
    }
    next(new AppError("Internal server error", 500));
  }
};

const userProfile = async (req, res, next) => {
  try {
    const { userId, role } = req.user;
    const userFound = await findUserById(userId);
    if (role != userFound.role) {
      throw new AppError("Access denied", 401);
    }
    return res.status(200).json({
      success: true,
      message: "user profile obtaoned",
      user: {
        _id: userFound._id,
        fullName: userFound.fullName,
        email: userFound.email,
        role: userFound.role,
      },
    });
  } catch (error) {
    if (error instanceof AppError) {
      return next(error);
    }
    next(new AppError("Internal server error", 500));
  }
};

const generateNewToken = async (req, res, next) => {
  try {
    const newAuthToken = res.locals.newAuthToken;

    if (!newAuthToken) {
      return res.status(400).json({ message: "Failed to generate new token" });
    }

    // Return the new auth token in the response body
    return res.status(200).json({
      message: "New token generated",
      success: true,
      token: newAuthToken, // Pass the new token in the response
    });
  } catch (error) {
    if (error instanceof AppError) {
      return next(error);
    }
    next(new AppError("Internal server error", 500));
  }
};

const logOutUser = async (req, res, next) => {
  try {
    const { userId } = req.user;
    const userFound = await findUserById(userId);

    if (!userFound) {
      throw new AppError("unauthorised access", 401);
    }
    if (role != userFound.role) {
      throw new AppError("Access denied", 401);
    }
    userFound.refreshToken = "";
    await userFound.save();

    res.cookie("userToken", "", { ...authTokenOption, maxAge: 0 }); // setting token expiry immediate manualy
    return res.status(200).json({
      sucess: true,
      message: "user logout successfully",
    });
  } catch (error) {
    if (error instanceof AppError) {
      return next(error);
    }
    next(new AppError("Internal server error", 500));
  }
};

export { signUpUser, loginUser, userProfile, logOutUser, generateNewToken };
