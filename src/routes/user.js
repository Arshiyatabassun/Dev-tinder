const express = require("express");
const mongoose = require("mongoose");
const userRouter = express.Router();
const { userAuth } = require("../middleware/Auth");
const ConnectionRequest = require("../models/connectionRequest");
const User =require("../models/user")
const USER_SAFE_DATA = "firstName lastName age gender photoUrl skills";

userRouter.get("/user/requests/recieved", userAuth, async (req, res) => {
  try {
    const loggedInuser = req.user;

    const connectionRequest = await ConnectionRequest.find({
      toUserId: loggedInuser._id,
      status: "interested",
      //  }).populate("fromUserId",["firstName","lastName","age","gender","photoUrl","skills"])(we can write like this also)
    }).populate("fromUserId", "firstName lastName age gender photoUrl skills");

    res.json({
      message: "Data fetched successfully",
      data: connectionRequest,
    });
  } catch (err) {
    res.status(404).send("ERR:", err.message);
  }
});

userRouter.get("/user/connections", userAuth, async (req, res) => {
  try {
    const loggedInuser = req.user;

    //   akshay sent a conncection request to elon //touserId to fromUserId
    //   elon sent a conncection request to akshay

    const connectionRequest = await ConnectionRequest.find({
      $or: [
        { toUserId: loggedInuser._id, status: "accepted" },
        { fromUserId: loggedInuser._id, status: "accepted" },
      ],
    }) .populate("fromUserId", USER_SAFE_DATA).populate("toUserId", USER_SAFE_DATA);
    
     

    const data = connectionRequest.map((row) =>{
      if (row.fromUserId._id.toString() === loggedInuser._id.toString()) {
        return row.toUserId;
      }
      return row.fromUserId; 
    });

    res.json({ data });
    // res.json({ connectionRequest });
  } catch (err) {
    res.status(400).send({ message: err.message });
  }
});

userRouter.get("/feed", userAuth, async (req, res) => {
  try {

    const page =parseInt(req.query.page) || 1
    let limit=parseInt(req.query.limit)|| 10

    limit =limit > 50 ?50 :limit

    const skip =(page -1) * limit;

    //user should see all the connection request except
    //0.his own caard
    //1.his connection
    //2.ignored people
    //3.aready sent connection request

    const loggedInuser = req.user;

    const connectionRequest = await ConnectionRequest.find({
      $or: [{ fromUserId: loggedInuser._id }, { toUserId: loggedInuser._id }],
    }).select("fromUserId  toUserId");

    const hideUsersFromFeed = new Set();
    connectionRequest.forEach((req) => {
        hideUsersFromFeed.add(req.fromUserId.toString())
        hideUsersFromFeed.add(req.toUserId.toString())
    });
    // console.log(hideUsersFromFeed)
//finding all the users
    const users = await User.find({
      $and: [
        { _id: { $nin: Array.from(hideUsersFromFeed) } },
        { _id: { $ne: loggedInuser._id } },
      ],
    }).select(USER_SAFE_DATA).skip(skip).limit(limit)
    // console.log(connectionRequest)
    res.send(users);
  } catch (err) {
    res.json({ message: err.message });
  }
});
module.exports = userRouter;
