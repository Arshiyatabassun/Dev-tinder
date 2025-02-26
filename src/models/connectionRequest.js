
const mongoose = require("mongoose");

const ConnectionRequestSchema = new mongoose.Schema({
    fromUserId:{
       type:mongoose.Schema.Types.ObjectId,
       required:true,
    },
    toUserId:{
      type:mongoose.Schema.Types.ObjectId,
      required:true,
    },
    status:{
      type:String,
      required:true,
      enum:
      {
       values: ["interested","ignored","accepted","rejected"],
      message:`{VALUE} is incorrect `
    },
},
} ,  { timestamps:true})

const ConnectionRequest =new mongoose.model(
    "ConnectionRequest" ,
    ConnectionRequestSchema
);