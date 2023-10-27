const express = require("express");

const productController = require("../controllers/productController");
const router = express.Router();

const isAuth = require('../middleware/is-Auth');

router.post('/add.product',isAuth,productController.addProduct);
router.get('/get.products',productController.getProduct);
router.get('/product.detail/:id',productController.productDetail);

router.post('/add.cart',isAuth,productController.addToCart);
router.get('/get.cart',isAuth,productController.getCart);

router.post('/add.comment',isAuth, productController.addProductComment);
router.get('/get.comments/:prodId',productController.getProductComment);
module.exports = router;