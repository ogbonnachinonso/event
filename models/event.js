const mongoose = require('mongoose')
const User = require('./user')
const EventSchema = new mongoose.Schema({
  name:{
    type: String,
    required: true
  },
  email:{
    type: String,
    required: true
  },
  category:{
    type: String,
    required: true
  },
   number:{
    type: Number,
    required: true
  },

  user:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  createdAt:{
    type: Date,
    default: Date.now
  }
})

module.exports = mongoose.model('Event', EventSchema)