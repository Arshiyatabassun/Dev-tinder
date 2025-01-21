

const mongoose = require("mongoose")
//conecting to cluster
const connectDB =async()=>{

    await mongoose.connect( "mongodb+srv://NamasteNode:xrE39yxpmfXhHi19@namastenode.2af6m.mongodb.net/devTinder")
}

module.exports =connectDB;

   
