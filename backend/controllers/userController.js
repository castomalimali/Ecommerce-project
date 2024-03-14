const User = require("../model/user");

const ErrorHandler = require("../utils/errorHandle");

const catchAsyncError = require("../middlewares/catchAsyncError");

//Registering a user API  => /api/v1/register
exports.registerUser = catchAsyncError(async (req, res, next) => {
  const { name, email, password } = req.body;
  const user = await User.create({
    name,
    email,
    password,
    avatar: {
      public_id: "Lake_Manyara_NP_11_fxaz2q",
      url: "https://res.cloudinary.com/dlzmmg9bl/image/upload/v1710328709/Lake_Manyara_NP_11_fxaz2q.jpg",
    },
  });
  const token = user.getJwtToken();
  res.status(201).json({
    success: true,
    token,
  });
});

//Login user via /api/v1/login

exports.loginUser = catchAsyncError(async (req, res, next) => {
  const { email, password } = req.body;
  //checks if email and password is entered by user
  if (!email || !password) {
    return next(new ErrorHandler("Please enter email and password", 400));
  }
  //finding user in database
  const user = await User.findOne({ email }).select("+password");

  if (!user) {
    return next(new ErrorHandler("Please enter email and password", 401));
    console.log("User can not be found");
  }

  
});
