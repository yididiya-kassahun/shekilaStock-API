const express = require("express");
const productController = require("../controllers/productController");
const router = express.Router();

router.post('/add.product',productController.addProduct);
router.get('/get.products',productController.getProduct);
router.get('/product.detail/:id',productController.productDetail);

module.exports = router;