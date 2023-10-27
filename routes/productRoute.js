const express = require("express");

const productController = require("../controllers/productController");
const router = express.Router();

const isAuth = require('../middleware/is-Auth');

router.post('/add.product',isAuth,productController.addProduct);
router.get('/get.products',productController.getProduct);
router.get('/product.detail/:id',productController.productDetail);

router.post('/add.cart',isAuth,productController.addToCart);
router.get('/get.cart',isAuth,productController.getCart);

module.exports = router;