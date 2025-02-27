  # Dev Tinder APIS
  # authRouter
  - POST/signUp
  - POST/login
  - POST/logout

  # profileRouter
  - GET/profile/view
  - PATCH/profile/edit
  - PATCH/profile/password =>forget password

  ## connectionRequestRouter
  <!-- POST/request/send/interested/:userId
  POST/request/send/ignored/:userId -->
  POST/request/send/:status/:requestId


  POST/request/review/:status/:requestId
  <!-- POST/request/review/accepted/:requestId
  POST/request/review/rejected/:requestId -->

  ## userRouter
  - GET /user/connections/recieved
  - GET /user/requests
  - GET /user/feed / gets you the profiles of other users on platforms


status:ignored interested accepted rejected