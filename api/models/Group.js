var mongoose = require('mongoose');

var GroupSchema = new mongoose.Schema({
  name: String,
  createDate: Date,
  admin: String
});



module.exports = mongoose.model('Group', GroupSchema);
