//esversion: 6
const Product = require("../model/product");
const ErrorHandler = require("../utils/errorHandle");
const errorHandler = require("../utils/errorHandle");

const APIFeatures = require('../utils/apiFeatures');

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

//create new product => /apu/v1/products?keyword=products
exports.getProducts = async (req, res, next) => {
  const apiFeature = new APIFeatures(Product.find(), req.query.keyword)
                     .search()
                     .filter()
  try {
    // const products = await Product.find(); // Use async/await to wait for the database query to complete
    const products = await apiFeature.query;

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

  if (!product) {
    return next(new ErrorHandler("Product not found", 404));
  }
  try {
    if (!product) {
      return next(new ErrorHandler("Product not found", 404));
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

// update product  with its id
exports.updateProduct = async (req, res, next) => {
  const productId = req.params.id;

  try {
    const product = await Product.findById(productId);
    if (!product) {
      return next(new ErrorHandler("Product not found", 404));

      const product = await Product.findByIdAndUpdate(productId, req.body, {
        new: true,
      });

      res.status(200).json({
        success: true,
        message: "Product updated",
        data: product,
      });
    }
  } catch (error) {
    console.log(error.message);
    res.status(500).json({
      success: false,
      message: "Server error: Unable to update product.",
    });
  }
};

// exports.updateProduct = async (req, res, next) => {
//   try {
//     const productId = req.params.id;

//     const product = await Product.findById(productId);

//     if (!product) {
//       return res.status(404).json({
//         success: false,
//         message: "Product not found",
//       });
//     }

//     // Update product using the found document
//     const updatedProduct = await product.updateOne(req.body, { new: true });

//     res.status(200).json({
//       success: true,
//       message: "Product updated successfully",
//       data: updatedProduct,
//     });
//   } catch (err) {
//     console.error(err);
//     return res.status(500).json({
//       success: false,
//       message: "Internal server error",
//     });
//   }
// };

//delete product by id
exports.deleteProduct = async (req, res, next) => {
  const productId = req.params.id;

  try {
    const productDelete = await Product.findByIdAndDelete(productId);
    if (!productDelete) {
      return next(new ErrorHandler("Product not found", 404));
      console.log("Product can not be deleted");
    }
    res.status(200).json({
      success: true,
      message: "Product deleted as successfully",
      data: productDelete,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({
      success: false,
      message: "Server error: Unable to delete product.",
    });
  }
};

////////////////////////////////ALTERNATIVE CODE TO DELETE PRODUCTS ///////////////////////////////////
// exports.deleteProduct = async (req, res, next) =>{
//   const product = await Product.findById(req.params.id);
//   try{
//     if(!product){
//       return res.status(404).json({
//         success: false,
//         message: "Product not found",
//       });
//       console.log("Product can not be deleted");

//     }
////////////////////////////////THIS CODE REMOVE PRODCUT FROM DB
// await product.remove();
//     res.status(200).json({
//       success: true,
//       message: "Product deleted as successfully",
//       product
//     })
//   }
//   catch(error){
//     console.log(error.message);
//     res.status(500).json({
//       success: false,
//       message: "Server error: Unable to delete product.",
//     });
//   }
// }
