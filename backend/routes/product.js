const express = require('express');
const router = express.Router();
const {getProducts, newProduct, getProduct} = require('../controllers/productsController');

router.route('/products').get(getProducts);
router.route('/product/new').post(newProduct);

//get a single product route
router.route('/product/:id').get(getProduct);

module.exports = router;