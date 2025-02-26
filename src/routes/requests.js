
const express = require("express")
const {userAuth} = require("../middleware/Auth")
const requestRouter = express.Router();
const ConnectionRequest = require ("../models/connectionRequest")


requestRouter.post("/request/send/interested/:userId",userAuth,async(req,res)=>{
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

// const allowedRequest =["interested","ignored"]

// if(!allowedRequest.includes()){
//     return res.status.send("connection request")
// }
   const data = await connectionRequest.save();

   res.json({
    message:"ConnectionRequest send successfully",
    data,
   })

}catch(err){
 res.status(400).send("ERROR:"+ err.message)
}
})



module.exports = requestRouter;