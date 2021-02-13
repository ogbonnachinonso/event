const mongoose = require('mongoose');

let gallerySchema = new mongoose.Schema({
  description: {
    type: String,
    required: true,
  },
  user:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  createdAt:{
    type: Date,
    default: Date.now
  },
  imgUrl:{  
    type: String 
} 
 
});



module.exports = mongoose.model('Gallery', gallerySchema);
