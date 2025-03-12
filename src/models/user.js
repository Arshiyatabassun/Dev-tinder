
const mongoose =require('mongoose');
const validator = require("validator");
const jwt= require("jsonwebtoken");
const bcrypt = require("bcrypt");
//creating a user schema
const userSchema = new mongoose.Schema({

    firstName:{
        type:String,
        required:true,
        minLength:5,
        maxLength:20,
    },
    lastName:{
        type:String
    },
    emailId:{
        type:String,
        required:true,
        unique:true,
        lowercase:String,
        trim:true,
        validate(value){
            if( !validator.isEmail){
                throw new Error("Invaalid Email address" + value)
            }
        }
    },
    gender:{
        type:String,
        enum:{
            values:["male","female","others"],
            message:`{VALUE} is nota valid Gender type`
        },
        // validate(value){
        //     if(!["male","female","others"].includes(value)){
        //         throw new Error("gender data is not valid")
        //     }
        // }
    },
    age:{
        type:Number,
        min:18,
        max:40,
    },
    password:{
        type:String,
        required:true,
        validate(value){
            if(!validator.isStrongPassword(value)){
                throw new Errow("Enter stong password" + value)
            }
        }
    
    },
    photoUrl:{
        type:String,
        default:"https://www.shutterstock.com/shutterstock/photos/1258445440/display_1500/stock-vector-person-gray-photo-placeholder-man-in-t-shirt-on-white-background-1258445440.jpg",
        validate(value){
            if(!validator.isURL(value)){
                throw new Errow("invalid photourl" + value)
            }
        }
    },
    about:{
        type:String,
         default:"this is default value of about",
    },
    skills:{
        type:[String],

    }
},{
    timestamps:true,
})

userSchema.methods.getJWT = async function (){
    const user =this;
    const token = await jwt.sign({_id:user._id},"DEV@Tinder$790",{expiresIn:"7d"})
    return token;
},

userSchema.methods.validatePassword =async function (passwordInputByUser){
    const user =this;
    const passwordHash =user.password;

    const isPasswordValid= await bcrypt.compare(passwordInputByUser,passwordHash)
    return isPasswordValid;
}
//creating a model
const User =mongoose.model("User",userSchema)
module.exports=User;
// //the abv code we can write like this also
// module.exports=mongoose.model("User",userSchema)