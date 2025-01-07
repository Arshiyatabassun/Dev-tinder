const express =require('express')
const app =express()



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
app.get("/ab?c",(req,res)=>{
      res.send({firstName:"Arshiya",
        lastName:"tabassum"
      })
    })

    app.get("/ab+c",(req,res)=>{
        res.send({firstName:"Arshiya",
          lastName:"tabassum"
        })
      })


      app.get("/ab*cd",(req,res)=>{
        res.send({firstName:"Arshiya",
          lastName:"tabassum"
        })
      })

      app.get("/ab*cd",(req,res)=>{
        res.send({firstName:"Arshiya",
          lastName:"tabassum"
        })
      })
//bc is optional
      app.get("/a(bc)?d",(req,res)=>{
        res.send({firstName:"Arshiya",
          lastName:"tabassum"
        })
      })

      app.get("/a(bc)+d",(req,res)=>{
        res.send({firstName:"Arshiya",
          lastName:"tabassum"
        })
      })
// /a/ is regex means tht if in the path any a letter is thr it will work
      app.get(/a/,(req,res)=>{
        res.send({firstName:"Arshiya",
          lastName:"tabassum"
        })
      })
//*fly$ means *anything in starting  $ means ends at the fly ex:butterfly,fly,draganfly it wrks
//dragonfly/1 it wont wrk
      app.get(/.*fly$/,(req,res)=>{
        res.send({firstName:"Arshiya",
          lastName:"tabassum"
        })
      })


      app.get("/user",(req,res)=>{
        console.log(req.query)//gives the information of the query parameter
        res.send({firstName:"Arshiya",
            lastName:"tabassum"
        })
      })
 //user/707 :means dynamic routing
      app.get("/user/:userId",(req,res)=>{
        console.log(req.params)
        res.send({
            firstName:"Arshiya",
            lastName:"tabassum"
        })
      })
    
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
app.use("/test", (req,res)=>{
    res.send("hello from test")
})


// app.use((req,res)=>{
//     res.send("hello from server")//request handler
// })

// app.use("/", (req,res)=>{
//     res.send("hello from Arshiya")
// })

app.listen(3000,()=>{

    console.log("server is successfully listening on port 3000....")
});