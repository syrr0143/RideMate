import jwt from "jsonwebtoken";

const validTokenTypes = ["auth", "refresh"];

const generateToken = (userId, tokenType) => {
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
        ? process.env.AUTH_JWT_SECRET || "1d"
        : process.env.REFRESH_JWT_SECRET || "30d";

    const expiresIn =
      tokenType === "auth"
        ? process.env.AUTH_TOKEN_EXPIRES_IN || "1d"
        : process.env.REFRESH_TOKEN_EXPIRES_IN || "30d";

    const token = jwt.sign({ userId }, secret, { expiresIn });
    return token;
  } catch (error) {
    console.error(`Error generating the ${tokenType} token:`, error.message);

    return next({
      statusCode: 500,
      message: `Error generating the ${tokenType} token: ${error.message}`,
    });
  }
};
const verifyJwt = async (token, tokenType) => {
  try {
    const decoded = jwt.verify(
      token,
      tokenType === "auth"
        ? process.env.AUTH_JWT_SECRET
        : process.env.REFRESH_JWT_SECRET
    );
    return decoded;
  } catch (error) {
    console.log(`Error verifying the ${tokenType} token:`, error.message);
    return next({
      statusCode: 500,
      message: `Error verifying the ${tokenType} token: ${error.message}`,
    });
  }
};
const decodeTokenWithoutVerify = (token) => {
  try {
    const decoded = jwt.decode(token, { complete: true }); // No verification here
    if (!decoded || !decoded.userId) {
      return next({
        statusCode: 401,
        message: "Invalid token structure",
      });
    }
    return decoded.userId;
  } catch (error) {
    console.log(
      `Error getting the userid from ${tokenType} token:`,
      error.message
    );
    return next({
      statusCode: 500,
      message: `Error getting the userid from ${tokenType} token`,
    });
  }
};

export { generateToken, verifyJwt, decodeTokenWithoutVerify };
