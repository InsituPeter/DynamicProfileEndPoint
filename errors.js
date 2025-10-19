const {StatusCodes} = require('http-status-codes');

class CustomError extends Error {
      constructor(message, statusCode=StatusCodes.INTERNAL_SERVER_ERROR) {
        super(message),
        this.statusCode = statusCode;
}
}

module.exports = CustomError ;