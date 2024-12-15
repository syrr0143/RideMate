import { hashPassword } from "../utils/security.utils.js";
import userModel from "../model/User.model.js";
import { AppError } from "../utils/errorHandler.utils.js";

async function findUserById(userId) {
  try {
    const userFound = await userModel.findById(userId);

    if (!userFound) {
      return null;
    }
    return userFound;
  } catch (error) {
    console.log("Error finding the user by ID:", error.message);
    throw new AppError(error.message || "Internal server error");
  }
}

async function findUserByEmail(email) {
  try {
    const userFound = await userModel.findOne({ email: email }).select("+password");
    if (!userFound) {
      return null;
    }
    return userFound;
  } catch (error) {
    console.log("Error finding the user by email:", error.message);
    throw new AppError(error.message || "Internal server error");
  }
}

// async function updateUser() {} need details to be updated TODO

async function deleteUserById(userId) {
  try {
    const userFound = await findUserById(userId);
    if (!userFound) {
      throw new AppError("no such user found", 404);
    }
    const userDeleted = await userModel.findByIdAndDelete(userId);
    return userDeleted;
  } catch (error) {
    console.log("Error deleting the user by ID:", error.message);
    throw new AppError(error.message || "Internal server error");
  }
}
async function deleteUserByEmail(email) {
  try {
    const userFound = await findUserByEmail(email);
    if (!userFound) {
      throw new AppError("no such user found", 404);
    }
    const userDeleted = await userModel.findOneAndDelete({ email: email });
    return userDeleted;
  } catch (error) {
    console.log("Error deleting the user by email:", error.message);
    throw new AppError(error.message || "Internal server error");
  }
}

async function createUser({ fullName, email, password }) {
  try {
    const existingUser = await findUserByEmail(email);
    if (existingUser) {
      throw new AppError(
        "user with same email already exists, please login instaed",
        409
      );
    }
    const hashedPassword = await hashPassword(password);
    let newUser = await userModel.create({
      fullName: fullName,
      email: email,
      password: hashedPassword,
    });
    newUser = await findUserById(newUser._id);
    return newUser;
  } catch (error) {
    console.error("Error creating the user:", error.message);
    if (error instanceof AppError) {
      throw error;
    }
    throw new AppError(error.message || "Internal server error");
  }
}

export {
  findUserById,
  findUserByEmail,
  createUser,
  deleteUserById,
  deleteUserByEmail,
};
