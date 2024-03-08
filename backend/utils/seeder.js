const Product = require('../model/product');
const dotenv = require('dotenv');
const connectDatabase = require("../config/database");

const products = require('../data/data')

dotenv.config({path: "backend/config/config.env"});

connectDatabase();

const seedProduct = async () =>{
    try{
        await Product.deleteMany();  
        console.log("Product deleted");

        await Product.insertMany(products);
        console.log("Product inserted");
        process.exit()
    }
    catch(error){
        console.log(error.message);
        process.exit();
    }
}

seedProduct();