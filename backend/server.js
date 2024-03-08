const app = require('./app');
const dotenv = require("dotenv");
const connectDatabase = require("./config/database");
const { connections } = require('mongoose');
/// configuration of dotenv environment
dotenv.config({path: "backend/config/config.env"});

console.log("development mode is", process.env.NODE_ENV);

// connections
connectDatabase();

app.listen(process.env.PORT,()=>{
    console.log(`Server is running on port ${process.env.PORT} in ${process.env.NODE_ENV} mode`);
})