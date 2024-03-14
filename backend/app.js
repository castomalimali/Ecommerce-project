//setup of express
const express = require("express");

//error handel import
const errorMiddleware = require("./middlewares/errors");
// const errorConfig = require('./config/errorConfig');
const app = express();
app.use(express.json());


//imports all routes
const products = require("./routes/product");
const user = require("./routes/user");


//define API url here
//----------------------------------------------------------------//
//============API Getways================================
//From Route folder to routes in APP
app.use("/api/v1", products);
app.use("/api/v1", user);
//Middleware to handle errors
app.use(errorMiddleware);

module.exports = app;
