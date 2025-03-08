
const jwt = require("jsonwebtoken");
const User =require("../models/user")
const userAuth = async (req,res,next)=>{
//read the token from the request cookies

// const cookies = req.cookies;
// const {token} =cookies;
try{

const {token}=req.cookies;
if(!token){
    // throw new Error("Token is not valid!!!!!!!!!!")
   return res.status(401).send("please login")
}
//validate the token
 const decodeObj = await jwt.verify(token,"DEV@Tinder$790")

 const {_id}=decodeObj;

 const user = await User.findById(_id)
//find the user
if(!user){
    throw new Error("user not found")
}
 req.user=user;
next();
 

}catch(err){
    res.status(400).send("ERR:"+err.message)
}   
};
module.exports={
    userAuth
}