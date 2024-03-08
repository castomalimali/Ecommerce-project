//esversion: 6
const Product = require("../model/product");

//creating new product => /api/v1/produxt/new
exports.newProduct = async (req, res, next) => {
  const product = await Product.create(req.body);

  res.status(201).json({
    success: true,
    product,
  });
};
// get all products => /api/v1/produxt/
// exports.getProducts =  async(req, res, next) => {

//   const Products = await Product.find();

//   res.status(200).json({
//     success: true,
//     data: Products
//   });
//   res.send(Products)
// };

//get all products from db

// exports.getProducts = async  (req, res, next) => {
//   const Products = await Product.find();
//   try{
//     res.status(200).json({
//       success: true,
//       count: Products.length,
//       data: Products

//     })
//   }
//   catch(error){
//     console.log("Serve fetch encountered with error ${error} ", error);
//     res.status(500).json({
//       success: false,
//       message: "Server error: Unable to fetch products.",
//     })

//   }
// }

//create new product
exports.getProducts = async (req, res, next) => {
  try {
    const products = await Product.find(); // Use async/await to wait for the database query to complete

    res.status(200).json({
      success: true,
      count: products.length, // Optionally, include the count of products returned
      data: products,
    });
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({
      success: false,
      message: "Server error: Unable to fetch products.",
    });
  }
};

//Get a single product form db

exports.getProduct = async (req, res, next) => {
  const product = await Product.findById(req.params.id);
  try {
    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }
    res
      .status(200)
      .json({ success: true, message: "Product found", data: product });
  } catch (error) {
    console.log("Fail to fetch product woth error:" + error.message);
    res.status(500).json({
      success: false,
      message: "Server error: Unable to fetch products.",
    });
  }
};

//update product  with its id 
exports.updateProduct = async (req, res, next) => {
  const productId = req.params.id;
  const product = await Product.findById(productId);
  

  try{
    if(!product){
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });

      product = await Product.findByIdAndUpdate(productId, req.body,{
        new: true,
      })

      res.status(200).json(
        {
          success: true,
          message: "Product updated",
          data: product
        }
      )


    }

  }
  catch(error){
    console.log(error.message);
    res.status(500).json({
      success: false,
      message: "Server error: Unable to update product.",
    });
  }
}
