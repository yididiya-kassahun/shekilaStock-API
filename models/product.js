const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const productSchema = new Schema({
   title: {
    type: String,
    required:true
   },
   price: {
    type: Number,
    required:true
   },
   image: {
    type: String,
    required:true,
   },
   userId:{
    type:Schema.Types.ObjectId,
    ref:'user',
    require:true
   }
});

module.exports = mongoose.model('product',productSchema);