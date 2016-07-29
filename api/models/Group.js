var mongoose = require('mongoose');

var GroupSchema = new mongoose.Schema({
  name: String,
  createDate: Date
});



module.exports = mongoose.model('Group', GroupSchema);
