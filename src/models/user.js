
const mongoose =require('mongoose')
//creating a user schema
const userSchema = new mongoose.Schema({

    firstName:{
        type:String
    },
    lastName:{
        type:String
    },
    emailId:{
        type:String
    },
    gender:{
        type:String
    },
    password:{
        type:String
    }
})
//creating a model
const User =mongoose.model("User",userSchema)
module.exports=User;
// //the abv code we can write like this also
// module.exports=mongoose.model("User",userSchema)