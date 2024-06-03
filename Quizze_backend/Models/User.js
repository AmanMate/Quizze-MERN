const mongoose = require('mongoose');
var Schema = mongoose.Schema;
const UserSchema = new Schema({
  name : String,
  email: String,
  password: String
});

module.exports =  mongoose.model('User', UserSchema)
