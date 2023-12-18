const mongoose = require('mongoose');

const userDataSchema = new mongoose.Schema({
  userName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
   
  },
  phone: {
    type: String,
    required: true,
 
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

const UserData = mongoose.model('UserData', userDataSchema);

module.exports = UserData;
