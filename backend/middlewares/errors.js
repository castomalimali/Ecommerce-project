const ErrorHandler = require('../utils/errorHandle');

module.exports = (err, req, res, next) =>{
    err.statusCode = err.statusCode || 500;
    err.message  = err.message || 'internal server error'

    res.statud(err.statusCode).json({
        success: false,
        error: err
    })
}