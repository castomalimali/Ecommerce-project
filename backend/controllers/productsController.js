//esversion: 6
const Product = require('../model/product');


//creating new product => /api/v1/produxt/new
exports.newProduct = async (req, res, next) => {

  const product = await Product.create(req.body);


  res.status(201).json({
    success: true,
    product
  })

}
//get all products => /api/v1/produxt/
// exports.getProducts =  (req, res, next) => {

//   const Products =  Product.find();
//   // convert products to json 

//   // var produsts_list = JSON.stringify(Products);
//   res.status(200).json({
//     success: true,
//     data: Products
//   });
//   res.send(Products)
// };

//get all products from db
exports.getProducts = (req, res, next) => {
  const Products = Product.find();

  try{
    res.status(200).json({
      success: true,
      count: Products.lenght,
      data: Products

    })
  }
  catch(error){
    console.log("Serve fetch encountered with error ${error} ", error);
    res.status(500).json({
      success: false,
      message: "Server error: Unable to fetch products.",
    })

  }
}
//create new product
// exports.getProducts = async (req, res, next) => {
//   try {
//     const products = await Product.find(); // Use async/await to wait for the database query to complete

//     res.status(200).json({
//       success: true,
//       count: products.length, // Optionally, include the count of products returned
//       data: products,
//     });
//   } catch (error) {
//     console.error("Error fetching products:", error);
//     res.status(500).json({
//       success: false,
//       message: "Server error: Unable to fetch products.",
//     });
//   }
// };