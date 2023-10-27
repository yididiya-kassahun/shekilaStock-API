Cart.findOne({productId:productId})
.then(prod=>{
  console.log(prod);
   if(prod){
    return res.json({message:'product exist in the cart'});
   }
   const cart = new Cart({
      userId:userId,
      
   });
   cart.save()
    .then(result=>{
    return Product.findById(productId);
     
   })
   .then(prod=>{
     Cart.findById(productId);
     cartItem = prod;
     prod.products.push(cart);
     prod.save();
   })
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