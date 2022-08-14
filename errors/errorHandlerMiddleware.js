const customError = require('./customError')
const errorHandlerMiddleware = (err, req, res, next) => {
  let statusCode = err.statusCode || 500
  let errMessage =
    err.message || 'Doslo je do greske sa serverom, pokusajte ponovo!'

  res.status(statusCode).json({ success: false, msg: errMessage, data: null })
}

module.exports = errorHandlerMiddleware
