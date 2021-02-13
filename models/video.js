const mongoose = require('mongoose');

let videoSchema = new mongoose.Schema({
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
  videoUrl:{  
    type: String 
} 
 
});



module.exports = mongoose.model('Video', videoSchema);