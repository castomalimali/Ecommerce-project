const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "please enter your name"],
    maxLength: [30, "Please the length of name is 30 character"],
  },
  email: {
    type: String,
    required: [true, "please enter your email"],
    unique: true,
    validate: [validator.isEmail, "Please enter a valid email"],
  },
  password: {
    type: String,
    required: [true, "please enter your password"],
    minLength: [6, "Please the length of password is 6 character"],
    select: false,
  },
  avatar: {
    public_id: {
      type: String,
      required: [true, "please enter your public id"],
    },
    url: {
      type: String,
      required: [true, "please enter your url"],
    },
  },
  role: {
    type: String,
    required: [true, "please enter your role"],
    default: "user",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  resetPasswordToken: String,
  resetPasswordExpires: Date,
});

//encrypting the password 
userSchema.pre('save', async function(next){
  if(!this.isModified('password')){
    next()
  }
  this.password = await bcrypt.hash(this.password, 10)
})

module.exports = mongoose.model("User", userSchema);
