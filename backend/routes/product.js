const express = require("express");
const router = express.Router();
const {
  getProducts,
  newProduct,
  getProduct,
  updateProduct,
  deleteProduct,
} = require("../controllers/productsController");

router.route("/products").get(getProducts);

//get a single product route
router.route("/product/:id").get(getProduct);

//add new product
router.route("/admin/product/new").post(newProduct);
//////////////GROUP ROUTE
//update product route
router
  .route("/admin/product/:id")
  .put(updateProduct)
  //delete produxt route
  .delete(deleteProduct);
// .patch(deleteProduct); AS IN CHAIN ROUTE

module.exports = router;
