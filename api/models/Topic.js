var mongoose = require('mongoose');

var TopicSchema = new mongoose.Schema({
    groupname: String,
    username: String,
    text: String,
    createDate: Date,
    comments: [{
        usernameT: String,
        ctext: String,
        ccreateDate: Date
    }]
});



module.exports = mongoose.model('Topic', TopicSchema);
