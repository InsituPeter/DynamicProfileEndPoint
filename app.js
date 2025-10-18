require("dotenv").config();
const express = require('express');
const app = express();
const cors = require('cors');
const rateLimit=require("express-rate-limit")
const port = process.env.PORT || 5000;
const  getProfile= require("./controller");
//const errorHandler = require('./errorHandler');
const { StatusCodes } = require("http-status-codes");

//Enales CORS for all routes
app.use(cors());
const limiter=rateLimit({
    WindowMs:1*60*1000,
    max:1000,
    message:"Too many requests from this IP, please try again later",
    standardHeaders: true,
    legacyHeaders: false,

})


app.get('/api/v1/me', getProfile);

// Error-Handler
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        message: err.message || "Internal Server Error"
    });
})

//notFoud middleware
app.use((req, res) => {
    res.status(StatusCodes.NOT_FOUND).json({message: "Route not found"});
})

//ser
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

