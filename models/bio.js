const mongoose = require('mongoose');

let bioSchema = new mongoose.Schema({
  bride: {
    type: [String],
    required: true,
  },
  groom: {
    type: [String],
    required: true,
  },
  met: {
    type: [String],
    
  },
  brideparents: {
    type: [String],
   
  },
  groomparents: {
    type: [String],
    
  },
  pastor: {
    type: [String],
    
  },
  maid: {
    type: [String],
    
  },
  bestman: {
    type: [String],
    
  },
  createdAt:{
    type: Date,
    default: Date.now
  }
  
});



module.exports = mongoose.model('Bio', bioSchema);