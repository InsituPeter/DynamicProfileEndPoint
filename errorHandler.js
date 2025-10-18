const{StatusCodes} = require("http-status-codes");
const errorHandler = (err, req, res, next) => {
    console.error(err.stack);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        status: "error",
        message: err.message || "Internal Server Error"
    });
}
module.exports = errorHandler;