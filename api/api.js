var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var User = require('./models/User.js');
var Group = require('./models/Group.js');
var Topic = require('./models/Topic.js');
var Request = require('./models/Request.js');
var jwt = require('jwt-simple');

var app = express();
app.use(bodyParser.json());
app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');

    next();
});

// adding intems to the page

app.post('/addgroup', function(req, res) {
    var group = req.body;
    var token = req.body.token;
    var payload = jwt.decode(token, "shh...");
    var userId = payload.sub;
    var newGroup = new Group({
        name: group.name,
        createDate: group.createDate,
        admin: group.admin
    });
    newGroup.save(function(err) {
        return res.status(200).send('Yey!');
    });
    User.findOne({
        _id: userId
    }).exec(function(err, user) {
        user.groups.push(group.name);
        user.save(function(err) {
            console.log(user);
        });
    });
});

app.post('/addtopic', function(req, res) {
    var topic = req.body;
    var username = topic.username;

    var newTopic = new Topic({
        groupname: topic.groupname,
        username: username,
        text: topic.text,
        createDate: topic.createDate,
        comments: topic.comments
    });
    newTopic.save(function(err, topic) {
      console.log(topic);
        return res.status(200).send(topic);
    });

});

app.post('/addcomment', function(req, res) {
    var comment = req.body;
    var topicId = comment.topicId;
    var usernameT = comment.usernameT;
    var ctext = comment.ctext;
    var ccreateDate = comment.ccreateDate;
    Topic.findByIdAndUpdate(
        topicId, {
            $push: {
                "comments": {
                    "usernameT": usernameT,
                    "ctext": ctext,
                    "ccreateDate": ccreateDate
                }
            }
        }, {
            safe: true,
            upsert: true
        },
        function(err) {
          if(err){
            console.log(err);
          }
        }
    );

});

app.post('/addrequest', function(req, res){
  var request = req.body;
  var username = request.username;

  var newRequest = new Request({
      username: username,
      groupname: request.groupname,
      admin: request.admin,
      answer: request.answer
  });
  newRequest.save(function(err, request) {
    console.log(request);
      return res.status(200).send(request);
  });
});

app.post('/register', function(req, res) {
    var user = req.body;

    var newUser = new User({
        username: user.username,
        password: user.password,
        firstname: user.firstname,
        lastname: user.lastname
    });

    newUser.save(function(err) {
        createSendToken(newUser, res);
    });
});

app.post('/login', function(req, res) {
    req.user = req.body;
    var searchUser = {
        username: req.user.username
    };
    User.findOne(searchUser, function(err, user) {
        if (err) {
            throw err;
        }

        if (!user)
            return res.status(401).send({
                message: 'Wrong username/password'
            });

        user.comparePasswords(req.user.password, function(err, isMatch) {
            if (err) throw err;

            if (!isMatch)
                return res.status(401).send({
                    message: 'Wrong username/password'
                })
            if (isMatch)
                createSendToken(user, res);
        });
    });

});

function createSendToken(user, res) {
    var payload = {
        sub: user.id
    };
    var token = jwt.encode(payload, "shh...");

    return res.status(200).send({
        user: user.toJSON(),
        token: token
    });
}

app.get('/content', function(req, res) {
    if (!req.headers.authorization) {
        return res.status(401).send({
            message: 'You are not authorized!'
        });
    }
    var token = req.headers.authorization.split(' ')[1];
    var payload = jwt.decode(token, "shh...");

    if (!payload.sub) {
        return res.status(401).send({
            message: "Authentication failed! "
        });
    }
    var groupname = req.query.groupname;
    Topic.find({
        groupname: groupname
    }, function(err, topics) {
        if (err) {
            console.log(err);
        }
        return res.json(topics);
    });
})

app.get('/groupsav', function(req, res) {
    if (!req.headers.authorization) {
        return res.status(401).send({
            message: 'You are not authorized!'
        });
    }
    var token = req.headers.authorization.split(' ')[1];
    var payload = jwt.decode(token, "shh...");

    if (!payload.sub) {
        return res.status(401).send({
            message: "Authentication failed! "
        });
    }
    var groups = req.query.groups;
    Group.find({}, function(err, groups_db) {
      var result_groups = [];
      if (err) {
          console.log(err);
      }
      for (var j = 0; j < groups_db.length; j++) {
          result_groups.push(groups_db[j])
      }
      return res.json(result_groups);
  });
});

app.post('/acceptrequest', function(req, res){
  var request = req.body;
  var username = request.username;
  var groupname = request.groupname;
  User.findOne({
      username: username
  }).exec(function(err, user) {
      var id = request._id;
      user.groups.push(groupname);
      user.save(function(err) {
          console.log(user);
      });
      Request.remove({
          _id: id
      }).exec(function(err) {
        if(err){
          console.log(err);
        }

      });
  });

});

app.post('/declinerequest', function(req, res){
  var request = req.body;
  var id = request._id;
  Request.remove({
      _id: id
  }).exec(function(err) {
    if(err){
      console.log(err);
    }

  });

});

app.get('/getrequests', function(req, res){
  if (!req.headers.authorization) {
      return res.status(401).send({
          message: 'You are not authorized!'
      });
  }
  var token = req.headers.authorization.split(' ')[1];
  var payload = jwt.decode(token, "shh...");

  if (!payload.sub) {
      return res.status(401).send({
          message: "Authentication failed! "
      });
  }
  var username = req.query.username;
  console.log(req.query);
  Request.find({admin: username}, function(err, requests) {
    if (err) {
        console.log(err);
    }
    return res.json(requests);
});
});

app.get('/mypage', function(req, res) {
    if (!req.headers.authorization) {
        return res.status(401).send({
            message: 'You are not authorized!'
        });
    }
    var token = req.headers.authorization.split(' ')[1];
    var payload = jwt.decode(token, "shh...");

    if (!payload.sub) {
        return res.status(401).send({
            message: "Authentication failed! "
        });
    }
    var userId = payload.sub;
    User.findOne({
        _id: userId
    }, function(err, user) {
        if (err) {
            console.log(err);
        }
        return res.json(user.groups);
    });

});

mongoose.connect('mongodb://localhost/userTest');

var server = app.listen(3000, function() {
    console.log('app listening on ', server.address().port);
});
