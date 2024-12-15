const isProduction = process.env.NODE_ENV === "production";

const getMaxAge = (days) => {
  const daysInMilliseconds = parseInt(days, 10) * 24 * 60 * 60 * 1000; // Convert days to milliseconds
  return isNaN(daysInMilliseconds)
    ? 7 * 24 * 60 * 60 * 1000
    : daysInMilliseconds; // Fallback to 7 days
};
const cookieOptions = {
  httpOnly: true, // Prevents JavaScript access
  sameSite: "strict", // Prevents CSRF attacks
  maxAge: 24 * 60 * 60 * 1000, // Default to 1 day
  path: "/", // Accessible for the entire domain
};

const refreshTokenOptions = {
  ...cookieOptions,
  maxAge: getMaxAge(process.env.REFRESH_TOKEN_EXPIRES_IN), // 7 days
};

const authTokenOption = {
  ...cookieOptions,
  maxAge: getMaxAge(process.env.AUTH_TOKEN_EXPIRES_IN),
};

export { cookieOptions, refreshTokenOptions, authTokenOption };
