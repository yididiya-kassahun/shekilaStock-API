const Product = require('../models/product');
const Cart = require('../models/cart');
const Comment = require('../models/comment');

exports.addProduct =(req,res)=> {
    if(!req.file){
   return res.status(422).json({message:'no image provided'});
    }
    const title = req.body.title;
    const price = req.body.price;
    const imageURL = req.file.filename;

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
    Product.find()
       .then(products=> {
          return res.status(201).json({products:products});
       })
       .catch(err=> {
        console.log(err);
       })
}

exports.productDetail = (req,res) => {
    const id = req.params.id;

    Product.findById(id)
       .then(product=> {
        console.log(product);
        return res.status(201).json({product:product});
       })
       .catch(err=> {
        console.log(err);
       })
}

exports.addToCart = (req,res)=> {
      const userId = req.body.userId;
      const productId = req.body.productId;

      Cart.findOne({productId:productId})
       .then(prod=>{
         console.log(prod);
          if(prod){
           return res.json({message:'product exist in the cart'});
          }
          const cart = new Cart({
             userId:userId,
             productId:productId
          });
          cart.save()
           .then(result=>{
            console.log(result);
            return res.status(201).json({message:'cart added'});
          })
           .catch(err=>{
            console.log(err);
           })
       })
       .catch(err=>{
        console.log(err);
       })
}

exports.getCart = (req,res)=> {
    const userId = req.body.userId;

    Cart.find({userId:userId})
    .then(items=> {
        res.status(200).json({message:'list of cart',cartItems:items});
    })
    .catch(err=>{
        console.log(err);
        res.status(422).json({message:'server error'});
    })
}

