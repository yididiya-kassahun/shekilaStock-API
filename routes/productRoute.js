const express = require("express");
const productController = require("../controllers/productController");
const router = express.Router();


router.post('/add.product',productController.addProduct);
router.post('/get.product',productController.getProduct);

module.exports = router;