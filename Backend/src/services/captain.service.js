
import { hashPassword } from "../utils/security.utils.js";
import captainModel from "../model/Captain.model.js";
import { AppError } from "../utils/errorHandler.utils.js";

async function findCaptainById(captainId) {
  try {
    const captainFound = await captainModel.findById(captainId);

    if (!captainFound) {
      return null;
    }
    return captainFound;
  } catch (error) {
    console.log("Error finding the captain by ID:", error.message);
    throw new AppError(error.message || "Internal server error");
  }
}

async function findCaptainByEmail(email) {
  try {
    const captainFound = await captainModel
      .findOne({ email: email })
      .select("+password");
    if (!captainFound) {
      return null;
    }
    return captainFound;
  } catch (error) {
    console.log("Error finding the captain by email:", error.message);
    throw new AppError(error.message || "Internal server error");
  }
}

// async function updatecaptain() {} need details to be updated TODO

async function deleteCaptainById(captainId) {
  try {
    const captainFound = await findCaptainById(captainId);
    if (!captainFound) {
      throw new AppError("no such captain found", 404);
    }
    const captainDeleted = await captainModel.findByIdAndDelete(captainId);
    return captainDeleted;
  } catch (error) {
    console.log("Error deleting the captain by ID:", error.message);
    throw new AppError(error.message || "Internal server error");
  }
}
async function deleteCaptainByEmail(email) {
  try {
    const captainFound = await findCaptainByEmail(email);
    if (!captainFound) {
      throw new AppError("no such captain found", 404);
    }
    const captainDeleted = await captainModel.findOneAndDelete({
      email: email,
    });
    return captainDeleted;
  } catch (error) {
    console.log("Error deleting the captain by email:", error.message);
    throw new AppError(error.message || "Internal server error");
  }
}

async function createCaptain({
  fullName,
  email,
  password,
  color,
  capacity,
  numberPlate,
  vehicleType,
}) {
  try {
    const existingCaptain = await findCaptainByEmail(email);
    if (existingCaptain) {
      throw new AppError(
        "captain with same email already exists, please login instaed",
        409
      );
    }
    const hashedPassword = await hashPassword(password);
    let newCaptain = await captainModel.create({
      fullName: fullName,
      email: email,
      password: hashedPassword,
      vehicle:{color , numberPlate, capacity , vehicleType}
    });
    newCaptain = await findCaptainById(newCaptain._id);
    return newCaptain;
  } catch (error) {
    console.error("Error creating the captain:", error.message);
    if (error instanceof AppError) {
      throw error;
    }
    throw new AppError(error.message || "Internal server error");
  }
}

export {
  findCaptainById,
  findCaptainByEmail,
  createCaptain,
  deleteCaptainById,
  deleteCaptainByEmail,
};
