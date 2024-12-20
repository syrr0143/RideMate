import jwt, { decode } from "jsonwebtoken";
import { AppError, TokenExpiredError } from "./errorHandler.utils.js";

const validTokenTypes = ["auth", "refresh"];

const generateToken = (userId, role, tokenType) => {
  try {
    if (!validTokenTypes.includes(tokenType)) {
      // throw new AppError(`Invalid token type: ${tokenType}`);
      return next({
        statusCode: 401,
        message: `Invalid token type: ${tokenType}`,
      });
    }

    const secret =
      tokenType === "auth"
        ? process.env.AUTH_JWT_SECRET
        : process.env.REFRESH_JWT_SECRET;

    const expiresIn =
      tokenType === "auth"
        ? process.env.AUTH_TOKEN_EXPIRES_IN || "1d"
        : process.env.REFRESH_TOKEN_EXPIRES_IN || "30d";

    const token = jwt.sign({ userId, role }, secret, { expiresIn });
    return token;
  } catch (error) {
    console.error(`Error generating the ${tokenType} token:`, error.message);

    throw new AppError(
      `Error generating the ${tokenType} token: ${error.message}`,
      500
    );
  }
};
const verifyJwt = async (token, tokenType) => {
  try {
    console.log("token in verifyjwt is ", token, tokenType);
    const secret =
      tokenType === "auth"
        ? process.env.AUTH_JWT_SECRET
        : process.env.REFRESH_JWT_SECRET;

    if (!secret) {
      throw new AppError({
        statusCode: 401,
        message: `Missing secret for ${tokenType} token`,
      });
    }
    const decoded = jwt.verify(token, secret);
    return decoded;
  } catch (error) {
    console.log(`Error verifying the ${tokenType} token:`, error);
    if (error.name === "TokenExpiredError") {
      throw new TokenExpiredError(`The ${tokenType} token has expired.`);
    }
    throw new AppError({
      statusCode: 500,
      message: `Error verifying the ${tokenType} token: ${error.message}`,
    });
  }
};
const decodeTokenWithoutVerify = (token) => {
  try {
    const decoded = jwt.decode(token, { complete: true }); // No verification here
    console.log("decode in twv", decoded);
    if (!decoded || !decoded.payload.userId) {
      throw new AppError({
        statusCode: 401,
        message: "Invalid token structure",
      });
    }
    return decoded.payload;
  } catch (error) {
    console.log(
      `Error getting the userid from token in decode without verify:`,
      error.message
    );

    throw new AppError({
      statusCode: 500,
      message: `Error getting the userid from token in decode without verify`,
    });
  }
};

export { generateToken, verifyJwt, decodeTokenWithoutVerify };
