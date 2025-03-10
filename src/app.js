const express = require("express");
const connectDB = require("./config/database");
// const User = require("./models/user");
const cookies = require("cookie-parser");
const cookieParser = require("cookie-parser");
const jwt =require("jsonwebtoken");
const cors = require("cors")
const app = express();


app.use(cors(
{
  origin:"http://localhost:5173",
  credentials:true,
}
))
app.use(express.json());
app.use(cookieParser());


const auth =require("./routes/auth")
const profile= require("./routes/profile")
const requests = require("./routes/requests");
const authRouter = require("./routes/auth");
const profileRouter = require("./routes/profile");
const requestRouter = require("./routes/requests");
const userRouter=require("./routes/user")


app.use("/",authRouter)
app.use('/',profileRouter)
app.use('/',requestRouter)
app.use("/",userRouter)

// app.use("/hello/2",(req,res)=>{
//     res.send("Abracadabara!!!")
// })

// app.use("/hello", (req,res)=>{
//     res.send("hello hello hello")
// })

// app.use("/xyz",(req,res)=>{
//     res.send("Hello from xyz")
// })
//itwill match request of /user,/xyz,/user/1
// app.use("/user",(req,res)=>{
//     res.send("HAHAHAHAH")
// })

//b? means b is optional here we can use the path as /ac,/abc
//ab+c -> +  means add as many bs as you
//ab*cd -> * means  add anything in b/w /abc/abbc/abbbbbc/aarshiyaccd
// app.get("/ab?c",(req,res)=>{
//       res.send({firstName:"Arshiya",
//         lastName:"tabassum"
//       })
//     })

//     app.get("/ab+c",(req,res)=>{
//         res.send({firstName:"Arshiya",
//           lastName:"tabassum"
//         })
//       })

//       app.get("/ab*cd",(req,res)=>{
//         res.send({firstName:"Arshiya",
//           lastName:"tabassum"
//         })
//       })

//       app.get("/ab*cd",(req,res)=>{
//         res.send({firstName:"Arshiya",
//           lastName:"tabassum"
//         })
//       })
// //bc is optional
//       app.get("/a(bc)?d",(req,res)=>{
//         res.send({firstName:"Arshiya",
//           lastName:"tabassum"
//         })
//       })

//       app.get("/a(bc)+d",(req,res)=>{
//         res.send({firstName:"Arshiya",
//           lastName:"tabassum"
//         })
//       })
// /a/ is regex means tht if in the path any a letter is thr it will work
//   app.get(/a/,(req,res)=>{
//     res.send({firstName:"Arshiya",
//       lastName:"tabassum"
//     })
//   })
//*fly$ means *anything in starting  $ means ends at the fly ex:butterfly,fly,draganfly it wrks
//dragonfly/1 it wont wrk
//   app.get(/.*fly$/,(req,res)=>{
//     res.send({firstName:"Arshiya",
//       lastName:"tabassum"
//     })
//   })

//   app.get("/user",(req,res)=>{
//     console.log(req.query)//gives the information of the query parameter
//     res.send({firstName:"Arshiya",
//         lastName:"tabassum"
//     })
//   })
//user/707 :means dynamic routing
//   app.get("/user/:userId",(req,res)=>{
//     console.log(req.params)
//     res.send({
//         firstName:"Arshiya",
//         lastName:"tabassum"
//     })
//   })

//this will only handle get call to the user
// app.get("/user",(req,res)=>{
//   res.send({firstName:"Arshiya",
//     lastName:"tabassum"
//   })
// })

// app.post("/user",(req,res)=>{
//     //save data to db
//     res.send("Data successfully saved to databas")
// })

// app.delete("/user",(req,res)=>{
//     res.send("Deleted successfully")
// })

//this will match all the HTTP Methods API calls to /test
// app.use("/test", (req,res)=>{
//     res.send("hello from test")
// })

// app.use((req,res)=>{
//     res.send("hello from server")//request handler
// })

// app.use("/", (req,res)=>{
//     res.send("hello from Arshiya")
// })

// console.log(req.body)




// API- get all the User by email
// app.get("/user",async(req,res)=>{
//     const userEmail =req.body.emailId;
//     try{
//         // const user= await User.find({})//give the all user document
//         const user =await User.find({emailId:userEmail})
//         res.send(user)
//     }catch(err){
//      res.status(404).send("somthing went wrong")
//     }
// })
// })

///Feed API-GET/feed-get all the users from the database
// app.get("/feed",async(req,res)=>{
//  const usersEmaild =req.body.emailId;
//     try{
//         const user1 =await User.find({emailId:usersEmaild})
//         if(user1.length === 0){
//           res.status(404).send('user not found')
//         }
//           else{

//               res.send(user1)
//           }

//         }catch(err){
//    res.status(400).send('somthing went wrong')
//     }
// })

//feed API-get the users by ID
// app.get("/feed",async(req,res)=>{
//     const _id =req.body;

//     try{
//         console.log(_id)
//         const user =await User.findById(_id)
//         res.send(user)

//     }catch(err){
//    res.status(400).send("usersid is not found")
//     }
// })

//Delete a user from the database
// app.delete("/feed", async (req, res) => {
//   const userId = req.body.userId;

//   try {
//     const user = await User.findByIdAndDelete({ _id: userId });
//     // const user = await User.findByIdAndDelete(userId)
//     res.send("user deleted successfully");
//   } catch {
//     res.status(404).send("somthing went wrong");
//   }
// });

//Update the Api

// app.patch("/user",async(req,res)=>{
// const userId = req.body.userId;
// :userId-passing the userid in the postman like this
app.patch("/user/:userId", async (req, res) => {
  const userId = req.params?.userId;
  const data = req.body;

  try {
    const ALLOWED_UPDATES = ["gender", "photoUrl", "about", "age", "skills"];
    const isUpdateAllowed = Object.keys(data).every((k) =>
      ALLOWED_UPDATES.includes(k)
    );
    if (!isUpdateAllowed) {
      throw new Error("update not allowed");
    }
    if (data?.skills.length > 10) {
      throw new Error("skills canot be morethan 10");
    }
    await User.findByIdAndUpdate({ _id: userId }, data),
      {
        runValidators: true,
      };
    res.send("user updated succeefully");
  } catch (err) {
    res.status(400).send("UPDATE FAILED:" + err.message);
  }
});
connectDB()
  .then(() => {
    console.log("Database connection estabhlished");
    app.listen(3000, () => {
      console.log("server is successfully listening on port 3000....");
    });
  })
  .catch((err) => {
    console.log("Database cannot be connectd! ");
  });
