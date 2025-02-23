

const mongoose = require("mongoose")
//conecting to cluster
const connectDB =async()=>{

    await mongoose.connect( "mongodb+srv://NamasteNode:vcEX3kFL9cIDtB8a@namastenode.2af6m.mongodb.net/devTinder")
}

module.exports =connectDB;

   
