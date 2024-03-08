const Product = require('backend/model/product');
//creating new product => /api/v1/produxt/new
exports.newProduct = async (req, res, next) => {
  const product = await Product.create(req.body);
  res.status(201).json({
    success: true,
    product
  })

}
//get all products => /api/v1/produxt/
exports.getProducts =  (req, res, next) => {
  const Products =  Product.find();
  res.status(200).json({
    success: true,
    Products
  });
};
