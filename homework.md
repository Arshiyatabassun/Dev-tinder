create a repository
Ininitialize the repository
node_modules,package.json,pakage_lock.json
install express
create a server
listen to port 7777
write the request handlers for the /test /hello
install nodemon and update scripts inside package.json
difference between caret tilde(^ vs ~)
what are dependencies
what is the use of "-g" while npm install

initialize git
.gitignore
create a remote repo on github
push all the codes to remote origin
play with routes and routes like /hello,/,/hello/2,/xyz
order of ssequence matters alot

Install Postman app and make a workspace/collection ->test the API call
Write the logic to handle GET,POST,PUT,PATCH,DELETE API calls and test them on Postman.
explore routing and use of ? * + () in the routes
use of regex in routes /a ,/.*fly$
reading the query params in the route
reading the dynamic routes


- Multiple Route Handler-play with the code
- next()
- next funtions and errors along with res.send
- app.use ("/route",rH,[rH2, rH3],rH4,rh5)
- what is middleware?why do we nedd it
- How Express js basically handles the requests behind the scences
- diffrence between app.use n app.all?
- write a dummy Auth middleware for admin
- write a dummy Auth middleware for  all user except /user/login


- create a free cluster on MongoDB official website (Mongo Atlas)
- Install MONGOOSE library
- Connect Your Application to database <conncetion URL> /devTinder
- call the connectDB function and connect the database before starting application on port 7777
- creating a userSchema and userModel
- create a POST /signup API to add the data to the database
- Push some documents using an API calls from postman.
- Error handling using try and catch


- difference b/w JsObject and JSON
- Add express.json middlewear to your app
- Make your signup API dynamic to recive the data from the end user
- User.findOne() with duplicate emailIds which object returns
- API-Get user by email
- API-feed API  Get/feed get all the users fromm the database
- API-Get the user by ID
- create a Delete user Api
- Difference between patch and put
- API- Update a user
- Explore the Mongoose documentation for the Model Methods
- what are options in a modole.findOneAndUpdate method read more about it.
-  API- update the user with  emailId

- Explore schematype options from documentation
- add required,unique,min,mixLength,trim
- add default
- create a custom validate function for gender
- Improve the DB schema put all appropriate validations on each field in schema
- add the timestamp to the user schema
- add API Level Validations on PACTH  request and signup POST Api
- DATA Sanitaizing -add API validation for each field.
- Install validators-npm i validator
- Explore validator library validation function and use validator functions for password, emailId,photoUrl
- NEVER TRUST req.body
- Validate data4 in signup API
- Install bcrypt package
- create a PasswordHash using bcrypt.hash and save the user with encrupted password

- create login API
- compare the passwords and throw err if email or passwrd is invalid

- install the cookie parser
- just send a dummy cookie to the user
- create GET/profile API and check if u get the cookie baack
- install json webtoken(JWT)
- In  login API after email and password validation,create a JWT Token and send it to the user in cookies
- read the cookies inside your profile API and find the loggedin user.

- userAuth middleware
- add the userAuth middleware in the profile and  a new sendconncetionRequest API
- set the expiry of JWT token and cookies for 7days.
- create userSchema methods to JWT()
- create userchema method to comparepassword (passwordinputByUser)

- Explore the tinder APIs
- Create a list of all APIS that you explore in Dev tinder
- Group the multiple routes under respective routers.
- read the documentation for Express.Router
-  create routes router for managing auth,profile,request router.
- create authRouter,profileRouter,requestRouter.
- import these routes in app.js

- create post/logout API
-  create PATCH/profile/edit API
- create PATCH/profile/password API =>forget API
- Make you valide all data in POST PATCH API'S

- create connection request SCHEMA
- Send connection request API
- proper validation of data
- Think aobout the corner cases
- $or,$and query in mongoose
- schema.pre("save") function
- Read more about indexes in mongoDB
- Why do we need indexes in DB?
- what are the advantageds and disadvantages in creating?
- Always think of corner cases

- write code for proper validations POST /request/review/:status/:requestId
- Thought process -POST vs GET
- Read about ref & populate 
- create GET /user/requests/recieved with all the check
- create GET /user/connections

- logic GET /feed API
- explore the $nin,$ne,$and and other query operators