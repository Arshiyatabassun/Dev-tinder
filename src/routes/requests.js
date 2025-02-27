
const express = require("express")
const {userAuth} = require("../middleware/Auth")
const requestRouter = express.Router();
const ConnectionRequest = require ("../models/connectionRequest")
const User = require("../models/user")


requestRouter.post("/request/send/:status/:toUserId",userAuth,async(req,res)=>{
    try{
    // const user =req.user;
//sending a connection request
    // console.log("sending a connection request")

    // res.send("Connection request send!!")
    // res.send(user.firstName   + "   connection request send")
   const  fromUserId=req.user._id;
   const  toUserId=req.params.toUserId;
   const  status =req.params.status;

   const connectionRequest = new ConnectionRequest({
    fromUserId,
    toUserId,
    status,
   });


const allowedRequest =["interested","ignored"]

if(!allowedRequest.includes(status)){
    return res.status(400).json({
        message:"Invalid status type: " + status
    })
}

const toUser = await User.findById(toUserId)
if(!toUser){
res.status(404).json({
    message:"User not found!!"
})
}
//if there is existing connection Request 

const existingConnectionRequest = await ConnectionRequest.findOne({
    $or:[{
        fromUserId,
        toUserId,
    },{fromUserId:toUserId,toUserId:fromUserId}],
  
})
if(existingConnectionRequest){
    return res.status(400).send({message:"connection request already exists"})
  }
   const data = await connectionRequest.save();

   res.json({
    message:req.user.firstName  + "   is  " +status+ "in  " +toUser.firstName,
    data,
   })

}catch(err){
 res.status(400).send("ERROR:"+ err.message)
}
})



module.exports = requestRouter;