const express = require("express");
const {userAuth}= require("../middleware/Auth")
const profileRouter=express.Router();
const {validateEditProfileData}=require("../utils/validations")

profileRouter.get("/profile/view",userAuth,async(req,res)=>{
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


profileRouter.patch("/profile/edit",userAuth,async(req,res)=>{
    try{
       if(!validateEditProfileData(req)){
        throw new Error("Invalid edit request")
       }
       const loggedInUser =req.user;
       console.log(loggedInUser)
       Object.keys(req.body).forEach((key)=>(loggedInUser[key]=req.body[key]))
       console.log(loggedInUser)
        await loggedInUser.save()//saved in db
    //    res.send(`${loggedInUser.firstName} your profile updated successfully`)
    //    res.send(`${loggedInUser.firstName} your profile updated successfully`)
    res.json({message:`${loggedInUser.firstName} your profile updated successfully`,
        data:loggedInUser},
    )
    }catch(err){
        res.status(400).send("ERR:"+ err.message)
    }
})
module.exports = profileRouter;