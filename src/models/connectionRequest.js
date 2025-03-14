
const mongoose = require("mongoose");
const User = require("../models/user")

const ConnectionRequestSchema = new mongoose.Schema({
    fromUserId:{
       type:mongoose.Schema.Types.ObjectId,
       ref:"User",//refrence to the user collection
       required:true,
    },
    toUserId:{
      type:mongoose.Schema.Types.ObjectId,
      ref:"User",
      required:true,
    },
    status:{
      type:String,
      required:true,
      enum:
      {
       values: ["interested","ignored","accepted","rejected"],
      message:`{VALUE} is incorrect status type `
    },
},
} ,  { timestamps:true})

ConnectionRequestSchema.index({fromUserId:1 ,toUserId:1})

 ConnectionRequestSchema.pre("save",function (next){
    const connectionRequest =this;

    //check if the fromuserId is same as touserid
    if(connectionRequest.fromUserId.equals(connectionRequest.toUserId)){
        throw new Error("CANNOT send a conncetion request to yourself !!!!!")
    }
    next();
})
const ConnectionRequestModel =new mongoose.model(
    "ConnectionRequest" ,
    ConnectionRequestSchema
);
module.exports = ConnectionRequestModel;