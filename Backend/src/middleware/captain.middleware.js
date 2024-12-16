import {
  generateToken,
  verifyJwt,
  decodeTokenWithoutVerify,
} from "../utils/auth.utils.js";
import captainModel from "../model/Captain.model.js";
import { AppError } from "../utils/errorHandler.utils.js";

const authenticate = async (req, res, next) => {
  const token =
    req.headers.authorization?.split(" ")[1] || req.cookies.captainToken; //TODO dont forget to add cookie while login
  try {
    if (!token) {
      return res.status(401).json({ message: "No token provided" });
    }
    const decoded = await verifyJwt(token, "auth");
    req.captain = decoded;
    console.log("decode is ", decoded);
    if (decoded.role != "captain") {
      throw new AppError("access denied", 401);
    }
    next();
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      try {
        const { captainId, role } = decodeTokenWithoutVerify(token);
        if (!captainId) {
          return res.status(401).json({ message: "Invalid user in token" });
        }
        if (role != "captain") {
          throw new AppError("access denied", 401);
        }
        // find if rt is present in db
        const captainFound = await captainModel
          .findById(captainId)
          .select("+refreshToken");
        if (!captainFound || !captainFound.refreshToken) {
          return res.status(401).json({ message: "Unauthorized access" });
        }
        try {
          const refreshTokenValid = await verifyJwt(
            captainFound.refreshToken,
            "refresh"
          );
        } catch (refreshTokenError) {
          // If refresh token verification fails, trigger logout
          await logout({ captain: { captainId: captainFound._id } }, res);
          return res.status(401).json({
            success: false,
            message: "Invalid refresh token. Logged out.",
          });
        }

        const newRefreshToken = await generateToken(
          captainId,
          "captain",
          "refresh"
        );
        const newAuthToken = await generateToken(captainId, "captain", "auth");
        // also update the token noew with new token and send the new auth token to captain
        captainFound.refreshToken = newRefreshToken;
        await captainFound.save();
        res.setHeader("Authorization", `Bearer ${newAuthToken}`);
        res.cookie("captainToken", newAuthToken, {
          httpOnly: true,
          secure: true,
        });

        req.captain = { captainId: captainFound._id, role: captainFound.role };
        return next();
      } catch (refreshError) {
        return next({
          statusCode: 401,
          message: refreshError.message,
        });
      }
    } else {
      return res.status(401).json({ message: "Invalid access token" });
    }
  }
};

const logout = async (req, res, next) => {
  try {
    await captainModel.findByIdAndUpdate(req.captain.captainId, {
      $unset: { refreshToken: 1 },
    });
    res.clearCookie("captainToken");
    res.removeHeader("Authorization");
    res.status(200).json({
      success: true,
      message: "Logged out successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error during logout",
    });
  }
};

export { authenticate };
