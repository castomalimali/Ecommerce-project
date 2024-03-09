// 
const ErrorHandler = require("../utils/errorHandle"); // Assuming a custom error handler module

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500; // Set default status code to 500

  const errorForResponse = {
    success: false,
    message: err.message || "Internal Server Error", // Default message for production
  };

  if (process.env.NODE_ENV === "DEVELOPMENT") {
    // Include full error details for development
    errorForResponse.error = err;
    errorForResponse.errMessage = err.message;
    errorForResponse.stack = err.stack;
  } else if (process.env.NODE_ENV === "PRODUCTION") {
    // Handle specific errors in production
    if (err.name === "CastError") {
      const message = `Resource not found. Invalid: ${err.path}`;
      errorForResponse.message = message;
      errorForResponse.statusCode = 400; // Set specific status code for CastError
    } else if (err.name === "ValidationError") {
      const validationErrors = Object.values(err.errors).map(
        (error) => error.message
      );
      errorForResponse.message = validationErrors.join(", ");
      errorForResponse.statusCode = 400; // Set specific status code for ValidationError
    }
  }

  res.status(errorForResponse.statusCode || 500).json(errorForResponse);
};