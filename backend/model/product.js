const mongoose = require("mongoose");


const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "please enter the Name of product"],
    trim: true,
    maxLength: [100, "Please the length of product is 100 character"],
  },
  price: {
    type: Number,
    required: [true, "please enter the price of product"],
    trim: true,
    maxLength: [7, "Please the length of product is 7 character"],
    default: 0.0,
  },
  decription: {
    type: String,
    required: [true, "please enter the description of product"],
  },
  rating: {
    type: Number,
    default: 0,
  },
  image: [
    {
      public_id: {
        type: String,
        required: true,
      },
      url: {
        type: String,
        required: true,
      },
    },
  ],
  category: {
    type: String,
    required: [true, "please enter the category of product"],
    enum: {
      values: [
        "laptop",
        "mobile",
        "desktops",
        "shoes",
        "electronics",
        "camera",
        "headphones",
        "Accesories",
        "food",
        "books",
        "clothes/shoes",
        "outdoor",
        "beauty/fashion",
        "Health",
        "outdoor",
        "sporty",
        "home",
      ],
      message:"Please enter the category name"
    },
  },
  seller:{
    type: String,
    required: [true, "please enter the seller of product"],
  },
  stock: {
    type: Number,
    required: [true, "please enter the stock of product"],
    trim: true,
    maxLength: [7, "Please the length of product is 7 character"],
    default: 0,
  },
numberofReviews:{
    type: Number,
    default: 0,
  },
  reviews: {
    type: [
      {
        name: {
          type: String,
          required: true,
        },
        rating: {
          type: Number,
          required: true,
        },
        comment: {
          type: String,
          required: true,
        },
        date: {
          type: Date,
          default: Date.now,
        },
      },
    ],
  },

});


module.exports = mongoose.model("Product", productSchema);
