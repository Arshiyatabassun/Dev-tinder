const express = require("express");
const mongoose = require("mongoose");
const userRouter = express.Router();
const { userAuth } = require("../middleware/Auth");
const ConnectionRequest = require("../models/connectionRequest");
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
    })
      .populate("fromUserId", USER_SAFE_DATA)
      .populate("toUserId", USER_SAFE_DATA);

    const data = connectionRequest.map((row) => {
        if(row.fromUserId_id.toString()===loggedInuser._id.toString()){
            return row.toUserId
        }
    return row.fromUserId
    }
       
    );

    res.json({ data });
  } catch (err) {
    res.status(400).send({ message: err.message });
  }
});
module.exports = userRouter;
