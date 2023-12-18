const mongoose = require('mongoose');


const userSchema = new mongoose.Schema({
    name: String,
    email: {
      type: String,
      required: true,
      unique: true,
    },
    phone: String,
    gender: String,
    hearAbout: String,
    city: String,
    state: String,
    password:String
  });
  
const User = mongoose.model('User', userSchema);





module.exports = User;