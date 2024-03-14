const User = require("../model/user");

const ErrorHandler = require("../utils/errorHandle");

const catchAsyncError = require("../middlewares/catchAsyncError");

//Registering a user API  => /api/v1/register
exports.registerUser = catchAsyncError( async (req, res, next) => {
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

  res.status(201).json({
    success: true,
    user,
  });
});
