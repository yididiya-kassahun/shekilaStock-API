const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
   userName: {
    type: String,
    required:true
   },
   userEmail: {
    type: String,
    required:true
   },
   userPass: {
    type: String,
    required:true
   },
   products:[
      {
         type:Schema.Types.ObjectId,
         ref:'product'
      }
   ]
});

module.exports = mongoose.model('user',userSchema);