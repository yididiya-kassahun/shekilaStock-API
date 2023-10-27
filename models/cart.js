const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const cartSchema = new Schema({
   userId: {
    type: String,
    required:true
   },
   product:[
      {
         type:Schema.Types.ObjectId,
         ref:'product',
         required:true
      }
   ]
});

module.exports = mongoose.model('cart',cartSchema);