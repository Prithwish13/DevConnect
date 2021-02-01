const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//create Schema
const UserSchema = new Schema({
  name: {
      type:String,
      required:true
  },
  email:{
      type:String,
      required:true
  },
  password:{
      type:String,
      required:true
  },
  avater:{
      type:String,
      required:true
  }
},{timestamps:true})

module.exports = mongoose.model('User',UserSchema);