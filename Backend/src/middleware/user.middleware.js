import {
  generateToken,
  verifyJwt,
  decodeTokenWithoutVerify,
} from "../utils/auth.utils.js";
import userModel from "../model/User.model.js";

const authenticate = async (req, res, next) => {
  const token =
    req.headers.authorization?.split(" ")[1] || req.cookies.userToken; //TODO dont forget to add cookie while login

  try {
    if (!token) {
      return res.status(401).json({ message: "No token provided" });
    }
    const decoded = await verifyJwt(token, "auth");
    req.user = decoded;
    if (decoded.role != "user") {
      throw new AppError("access denied", 401);
    }
    next();
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      try {
        const { userId, role } = decodeTokenWithoutVerify(token);
        if (!userId) {
          return res.status(401).json({ message: "Invalid user in token" });
        }
        if (role != "user") {
          throw new AppError("access denied", 401);
        }
        // find if rt is present in db
        const userFound = await userModel
          .findById(userId)
          .select("+refreshToken");
        if (!userFound || !userFound.refreshToken) {
          return res.status(401).json({ message: "Unauthorized access" });
        }
        try {
          const refreshTokenValid = await verifyJwt(
            userFound.refreshToken,
            "refresh"
          );
        } catch (refreshTokenError) {
          // If refresh token verification fails, trigger logout
          await logout({ user: { userId: userFound._id } }, res);
          return res.status(401).json({
            success: false,
            message: "Invalid refresh token. Logged out.",
          });
        }

        const newRefreshToken = await generateToken(userId, "user", "refresh");
        const newAuthToken = await generateToken(userId, "user", "auth");
        // also update the token noew with new token and send the new auth token to user
        userFound.refreshToken = newRefreshToken;
        await userFound.save();
        res.setHeader("Authorization", `Bearer ${newAuthToken}`);
        res.cookie("userToken", newAuthToken, { httpOnly: true, secure: true });

        req.user = { userId: userFound._id, role: userFound.role };
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
    await userModel.findByIdAndUpdate(req.user.userId, {
      $unset: { refreshToken: 1 },
    });
    res.clearCookie("userToken");
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
