import {
  generateToken,
  verifyJwt,
  decodeTokenWithoutVerify,
} from "../utils/auth.utils.js";
import { AppError, TokenExpiredError } from "../utils/errorHandler.utils.js";
import userModel from "../model/User.model.js";

const authenticate = async (req, res, next) => {
  const token =
    req.headers.authorization?.split(" ")[1] || req.cookies.userToken; //TODO dont forget to add cookie while login

  try {
    if (!token) {
      console.log("no token");
      return res.status(401).json({ message: "No token provided" });
    }
    const decoded = await verifyJwt(token, "auth");
    console.log("decoded is ", decoded);
    const userFounds = await userModel
      .findById(decoded.userId)
      .select("+refreshToken");
    console.log("user found with rt is try is ", userFounds);
    req.user = decoded;
    if (decoded.role != "user") {
      throw new AppError("access denied", 401);
    }
    return next();
  } catch (error) {
    console.log("errorfor token expired is ", error);
    console.log("token is  ", token);
    if (error instanceof TokenExpiredError) {
      try {
        console.log("token is expired");
        const { userId, role } = decodeTokenWithoutVerify(token);
        if (!userId) {
          throw new AppError("Invalid token data", 401);
        }
        if (role != "user") {
          throw new AppError("access denied", 401);
        }
        // find if rt is present in db
        console.log("find rt from user db");
        const userFound = await userModel
          .findById(userId)
          .select("+refreshToken");
        console.log("user found with rt is", userFound);

        if (!userFound || !userFound.refreshToken) {
          throw new AppError("Unauthorized access", 401);
        }
        try {
          await verifyJwt(userFound.refreshToken, "refresh");
          console.log("validating rt");
          const newRefreshToken = await generateToken(
            userId,
            "user",
            "refresh"
          );
          const newAuthToken = await generateToken(userId, "user", "auth");
          userFound.refreshToken = newRefreshToken;
          await userFound.save();
          res.setHeader("Authorization", `Bearer ${newAuthToken}`);
          res.cookie("token", newAuthToken, { httpOnly: true, secure: false });

          req.user = { userId: userFound._id, role: userFound.role };
          res.locals.newAuthToken = newAuthToken;
          return next();
        } catch (refreshTokenError) {
          // If refresh token verification fails, trigger logout
          console.log("refresh token error is ", refreshTokenError);
          await logout({ user: { userId: userFound._id } }, res);
          return;
          // throw new AppError("Invalid refresh token. Logged out.", 401);
        }
      } catch (refreshError) {
        return next({
          statusCode: 401,
          message: refreshError.message,
        });
      }
    } else {
      console.log(error);
      return next(new AppError("Invalid access token", 401));
    }
  }
};

const logout = async (req, res, next) => {
  try {
    await userModel.findByIdAndUpdate(req.user.userId, {
      $unset: { refreshToken: 1 },
    });
    res.clearCookie("token");
    res.removeHeader("Authorization");
    res.status(200).json({
      success: true,
      message: "Logged out successfully",
    });
  } catch (error) {
    next(new AppError("Error during logout", 500));
  }
};

export { authenticate };
