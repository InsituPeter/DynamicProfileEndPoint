require("dotenv").config();
const express = require('express');
const app = express();
const cors = require('cors')
const axios = require('axios');
const rateLimit=require("express-rate-limit")
const port = process.env.PORT || 5000;
const CustomError = require('./errors');
const { StatusCodes } = require("http-status-codes");



const limiter=rateLimit({
    windowMs:1*60*1000,
    max:1000,
    message:"Too many requests from this IP, please try again later",
    standardHeaders: true,
    legacyHeaders: false,

})

//Middleware
app.use(cors());
app.use(limiter);

// GET /me endpoint
app.get("/me", async(req, res, next) => {
    console.log("Received request for /me endpoint");
    const catInfo= await axios.get ('https://catfact.ninja/fact',{
    timeout:5000
   })
   
   console.log("Cat info status:", catInfo.status);

   if(catInfo.status!==StatusCodes.OK){
     return next (CustomError('Failed to fetch cat fact', StatusCodes.SERVICE_UNAVAILABLE));
   }
   
   res.status(StatusCodes.OK).json({
      "status":"success",
       "user":{
           "email":process.env.USER_EMAIL,
           "name": process.env.USER_NAME,
           "stack":process.env.BACKEND_STACK
      },
       "timestamp": new Date().toISOString(),
       "fact": catInfo.data.fact
    });
  
   })


// Error Handler
app.use((err, req, res, next) => {
    if(err instanceof CustomError){
        return res.status(err.statusCode).json({
            message: err.message
        });
    }

    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        message: err.message || "Internal Server Error"
    });
})

//notFound handler
app.use((req, res) => {
    res.status(StatusCodes.NOT_FOUND).json({message: "Route not found"});
})

//ser
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

