var mongoose = require('mongoose');

var RequestSchema = new mongoose.Schema({
  username: String,
  groupname: String,
  admin: String,
  answer: String
});



module.exports = mongoose.model('Request', RequestSchema);
