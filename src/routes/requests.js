
const express = require("express")
const {userAuth} = require("../middleware/Auth")
const requestRouter = express.Router();


requestRouter.post("/sendConnectionRequest",userAuth,async(req,res)=>{
    const user =req.user;
//sending a connection request
    console.log("sending a connection request")

    // res.send("Connection request send!!")
    res.send(user.firstName   + "   connection request send")
})

module.exports = requestRouter;