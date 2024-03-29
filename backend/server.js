const app = require('./app');
const dotenv = require("dotenv");

//Handle uncaught exception
process.on('uncaughtException',err=>{
    console.log('ERROR: '+ err.stack);
    console.log('ERROR: '+ err.message);
    console.log("Shutting down due to uncaught exception");
    process.exit(1);
});


const connectDatabase = require("./config/database");
const { connections } = require('mongoose');
/// configuration of dotenv environment
dotenv.config({path: "backend/config/config.env"});

console.log("development mode is", process.env.NODE_ENV);

// connections
connectDatabase();

const server = app.listen(process.env.PORT,()=>{
    console.log(`Server is running on port ${process.env.PORT} in ${process.env.NODE_ENV} mode`);
})

//Handle unhandled Promise rejections 
process.on('unhandledRejection', err =>{
    console.log("ERROR: "+err.message);

    console.log('Shutting down server due to unhandled  Promise rejection');
    server.close(()=>{
        process.exit(1);
    })

})