const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const commentSchema = new Schema({
   userId: {
    type: String,
    required:true
   },
   productId: {
    type: String,
    required:true
   },
   comment: {
    type: String,
    required:true
   }
});

module.exports = mongoose.model('comment',commentSchema);