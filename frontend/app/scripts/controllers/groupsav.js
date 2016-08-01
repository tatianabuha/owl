'use strict';

angular.module('testAuthToken2App').controller('GroupsavCtrl', function ($scope, $http, API_URL, alert, $state) {
  var user = {
    groups: $scope.groups
  };
  var url = API_URL + 'groupsav';
  var config = {
    params: user
  };
  $http.get(url, config).success(function(groupsDb) {
    if (groupsDb.length < 1) {
       groupsDb.push('No groups found...');
    }
    for (var i = 0; i < user.groups.length; i++) {
        for (var j = 0; j < groupsDb.length; j++) {
            if (user.groups[i] === groupsDb[j].name){
              groupsDb.splice(j, 1);
            }
        }
    }
    $scope.groupsav = groupsDb;
  }).error(function(err) {
    alert('warning', 'Unable to get the groups! ', err.message);
  });
  $scope.requests = [];
  var urlreq = API_URL + 'getrequests';
  var userreq = {
    username: $scope.usernamel
  };
  config = {
    params: userreq
  };
  $http.get(urlreq, config).success(function(requests) {
    if (requests.length < 1) {
       $scope.requests = 'No pending requests for you...';
    }
    $scope.requests = requests;
  }).error(function(err) {
    alert('warning', 'Unable to get the requests! ', err.message);
  });
  $scope.sendRequest = function(group, username){
    var urll = API_URL + 'addrequest';
    var request = {
      groupname: group.name,
      username: username,
      admin: group.admin,
      answer: 'pending'
    };
    console.log(request);
    $http.post(urll, request)
    .success(function(){
      alert('success', 'Request sent!');
      $state.go('mypage.groupsav');
    })
    .error(function(err){
      console.log(err);
      alert('warning', 'Something went wrong ', ':(');
    });
  };
  $scope.answerRequestYes = function(request){
    var urlr = API_URL + 'acceptrequest';
    console.log(request);

    $http.post(urlr, request)
    .success(function(){
      alert('success', 'Request accepted!');
      $state.go('mypage.groupsav');
    })
    .error(function(err){
      console.log(err);
      alert('warning', 'Something went wrong ', ':(');
    });
  };
    $scope.answerRequestNo = function(request){
      var urln = API_URL + 'declinerequest';
      console.log(request);

      $http.post(urln, request)
      .success(function(){
        alert('success', 'Request declined!');
        $state.go('mypage.groupsav');
      })
      .error(function(err){
        console.log(err);
        alert('warning', 'Something went wrong ', ':(');
      });
  };
});
