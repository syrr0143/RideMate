class AppError extends Error {
  constructor(message, statusCode = 500) {
    super(message);
    this.statusCode = statusCode; // Default to 500 if no status code is provided
    this.isOperational = true; // Mark this error as operational
    Error.captureStackTrace(this, this.constructor);
  }
}

const errorHandler = (err, req, res, next) => {
  console.error("Error:", err.message); // Log the error for debugging (only in development)

  // Operational errors (expected errors)
  if (err.isOperational) {
    return res.status(err.statusCode).json({
      success:false,
      message: err.message,
    });
  }

  // For unexpected errors, send a 500 server error
  res.status(500).json({
    success:false,
    message: err.message || "Internal server error",
  });
};

export { AppError, errorHandler };
