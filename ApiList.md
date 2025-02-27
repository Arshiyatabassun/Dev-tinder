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




