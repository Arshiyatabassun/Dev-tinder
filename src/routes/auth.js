
const express = require("express");
const authRouter = express.Router();
const User = require("../models/user");
const { validateSignUpData } = require("../utils/validations");
const bcrypt = require("bcrypt");


authRouter.post("/signup", async (req, res) => {
    //creating an instance of new user model
    // const user= new User({
    //     firstName:"izhan",
    //     lastName:"mohammed",
    //     emailId:"izhan123@gmail.com",
    //     password:"izzu@1232",
    // });
    try {
      // validation of data
      validateSignUpData(req);
  
      const { firstName, lastName, emailId, password } = req.body;
      //Encrypt the password -$2b$10$Qt8gt0xKc6SWWFU4NgLL/uECJ4y.b7hBmLm3Hmien0wx2msL0FLD2
      const passwordHash = await bcrypt.hash(password, 10);
      console.log(passwordHash);
  
      const user = new User({
        firstName,
        lastName,
        emailId,
        password: passwordHash,
      });
      await user.save();
      res.send("user added successfully");
    } catch (err) {
      res.status(400).send("error saving the user:" + err.message);
    }
  });

  authRouter.post("/login", async (req, res) => {
    try {
      const { emailId, password } = req.body;
  
      const user = await User.findOne({ emailId: emailId });
      if (!user) {
      //   throw new Error("enter the emailId");
        throw new Error("Invalid credentials");
      }
  
      const isPasswordValid = await user.validatePassword(password);
      console.log(isPasswordValid)
      if (isPasswordValid) {
  
        //create the JWT token
  //    const token =await jwt.sign({_id:user._id},"DEV@Tinder$790",{expiresIn:"7d"})
     const token =await user.getJWT();
  //    console.log(token)
     // add the token to the cookies and send response back to the user
    res.cookie("token",token);
        // res.send("Login successfull!!!!!!!!!")
        res.send(user)
      } else {
      //    throw new Error ("enter strong passwerd");
        throw new Error("Invalid credentials");
      }
    } catch (err) {
      res.status(400).send("Err: " + err.message);
    }
  });

  authRouter.post("/logout",async(req,res)=>{
  res.cookie("token",null,{
    expires:new Date(Date.now())
  })
  res.send("Logout succeefull!!!!")
  })

  module.exports =authRouter;