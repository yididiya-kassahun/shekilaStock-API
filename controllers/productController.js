const product = require('../models/product');
const path = require("path");
const Product = require('../models/product');

exports.addProduct =(req,res)=> {
//     if(!req.file){
//    return res.status(422).json({message:'no image provided'});
//     }
    const title = req.body.title;
    const price = req.body.price;
    const imageURL = req.file.path;

   const product = new Product({
        title:title,
        price:price,
        image:imageURL
    });
    product.save()
    .then(result=>{
         console.log(result);
       return res.status(201).json({message:'add product',title:title,price:price,image:imageURL});
    })
    .catch(err=>{
        console.log(err);
    })
}

exports.getProduct = (req,res)=> {
    
}