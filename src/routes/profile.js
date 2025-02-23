const express = require("express");
const {userAuth}= require("../middleware/Auth")
const profileRouter=express.Router();

profileRouter.get("/profile",userAuth,async(req,res)=>{
    //creating a cookie
    try{
    // const cookies = req.cookies;
    // const {token}= cookies;
    // console.log(cookies)
    // if(!token){
    //     throw new Error('Invalid token')
    // }

    //validate the token
    //  const decodedMessage =  await jwt.verify(token,"DEV@Tinder$790")
    //  console.log(decodedMessage);
    //  const {_id}=decodedMessage;
    //  console.log("loggedin user is:"+ _id)

    //  const user = await User.findById(_id)
    //  if(!user){
    //     throw new Error("User doesnot exits")
    //  }

    const user=req.user;
    res.send(user)
    }catch(err){
        res.status(400).send("user doesnot exits")
    }
})

module.exports =profileRouter;