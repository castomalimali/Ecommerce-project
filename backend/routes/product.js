const express = require('express');
const router = express.Router();
const {getProducts, newProduct, getProduct, updateProduct} = require('../controllers/productsController');

router.route('/products').get(getProducts);


//get a single product route
router.route('/product/:id').get(getProduct);

//add new product  
router.route("/admin/product/new").post(newProduct);
//updtae product route
router.route('/admin/product/:id').put(updateProduct);

module.exports = router;