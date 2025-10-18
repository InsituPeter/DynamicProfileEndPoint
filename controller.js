const {StatusCodes}=require('http-status-codes');
const axios=require('axios');


const getProfile= async (req, res, next)=>{

const catInfo= await axios.get("https://catfact.ninja/fact");
if(catInfo.status!==200){
  throw new Error('Failed to fetch cat fact');
}

res.status(StatusCodes.OK).json({
   "status":"success",
    "user":{
        "email":"Insitupeter@gmail.com",
        "name": "Peter, Fiyin",
        "stack":"Node.js/Express"
   },
    "timestamp": new Date().toISOString(),
    "fact": catInfo.data.fact
 });
}


module.exports= getProfile
