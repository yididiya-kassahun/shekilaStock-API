const Product = require('../models/product');
const Cart = require('../models/cart');
const Comment = require('../models/comment');
const User = require('../models/user');

let creator;

exports.addProduct =(req,res)=> {
    if(!req.file){
   return res.status(422).json({message:'no image provided'});
    }
    const title = req.body.title;
    const price = req.body.price;
    const imageURL = req.file.filename;
    const description = req.body.description;

   const product = new Product({
        title:title,
        price:price,
        image:imageURL,
        description:description,
        userId:req.userId
    });
    product.save()
     .then(result=>{
        return User.findById(req.userId);
    })
    .then(user=> {
        if(!user){
            return res.status(401).json({message:'error occured'});
        }
         creator = user;
         user.products.push(product);
         user.save();
    })
    .then(result=>{
        return res.status(201).json({message:'add product',product:result,creator:{_id:creator._id,name:creator.userName}});
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

exports.addToCart = async (req,res)=> {
      const userId = req.userId;
      const productId = req.body.productId;

      Cart.findOne({productId:productId})
      .then(prod=>{
         if(prod){
          return res.json({message:'product exist in the cart'});
         }

        return Product.findById(productId);
        })
        .then(product=>{
            Cart.findOne({userId:userId})
            .then(user=>{
                if(user){
                    const updatedUser = Cart.findOneAndUpdate(
                       { userId:userId},
                        { $push: { product: product } },
                        { new: true } 
                      );
                  return updatedUser;
                }else{
                    const cart = new Cart();
                    cart.userId = userId;
                    cart.product.push(product);
                   return cart.save()
                }
            })
        })
        .then(result=>{
            return res.json({message:'cart added',result:result});
       });

}

exports.getCart = (req,res)=> {
    const userId = req.userId;
     //  userId:userId
    Cart.find({ userId:userId })
      .populate('product')
      .then(products => {
        res.json({ products:products });
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({ message: 'Internal Server Error' });
      });
}

exports.addProductComment = (req,res,next) => {
    const userName = req.body.userName;
    const productId = req.body.productId;
    const productComment = req.body.comment;

    if(!req.userId){
         res.json({message:'unAuthorized'});
    }
    const comment = new Comment({
        userName:userName,
        productId:productId,
        comment:productComment
    });
    comment.save()
    .then(result=>{
        res.json({message:'comment added',res:result});
    })
    .catch(err=>{
        console.log(err);
    });
}

exports.getProductComment = (req,res)=>{
    const productId = req.params.prodId;
 
    Comment.find({productId:productId})
    .then(commentList=>{
        res.json({message:'list of comments', comments:commentList});
    })
    .catch(err=>{
        console.log(err);
        res.json({message:'unable to fetch comments'});
    })
}
