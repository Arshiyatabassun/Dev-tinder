
const mongoose =require('mongoose')
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
    },
    gender:{
        type:String,
        validate(value){
            if(!["male",'female',"others".includes(value)]){
                throw new Error("gender data is not valid")
            }
        }
    },
    age:{
        type:Number,
        min:18,
    },
    password:{
        type:String,
        required:true,
    
    },
    photoUrl:{
        type:String,
        default:"https://www.shutterstock.com/shutterstock/photos/1258445440/display_1500/stock-vector-person-gray-photo-placeholder-man-in-t-shirt-on-white-background-1258445440.jpg",
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
//creating a model
const User =mongoose.model("User",userSchema)
module.exports=User;
// //the abv code we can write like this also
// module.exports=mongoose.model("User",userSchema)