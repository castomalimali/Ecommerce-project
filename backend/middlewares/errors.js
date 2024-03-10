const ErrorHandler = require("../utils/errorHandle");

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;

  if (process.env.NODE_ENV === "DEVELOPMENT") {

    res.status(err.statusCode).json({
      success: false,
      error: err,
      errMessage: err.message,
      stack: err.stack,
    });
  }

  if (process.env.NODE_ENV === "PRODUCTION") {

    let error = { ...err };

    error.message = err.message;

    //Wrong Mongoose object id
    if(err.name === 'CastError'){
      
 error= new ErrorHandler('Resource can not found. Invalid: '+ err.path, 400)
    }
    //Handling Mongoose Validation Error
    if(err.message === 'ValidationError'){
      const message = Object.values(err.values).map(value => value.message).join(",");
      error = new ErrorHandler(message, 400)
    }
    res.status(error.statusCode).json({
      success: false,
      message: error.message || "Internal Server Error",
    });
  }


  //   res.status(err.statusCode).json({
  //     success: false,
  //     error: err.stack,
  //   });
};