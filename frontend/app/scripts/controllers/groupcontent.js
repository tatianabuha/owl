'use strict';

angular.module('testAuthToken2App').controller('GroupcontentCtrl', function ($scope, $http, API_URL, alert) {
  $scope.getGroupname = function(groupname) {
    var group = {
      groupname: groupname
    };
    var url = API_URL + 'content';
    var config = {
      params: group
    };
    $scope.groupname = groupname;
    $http.get(url, config).success(function(topics) {
      if (topics.length < 1) {
        console.log('nada');
      }
      $scope.topics = topics;
    }).error(function(err) {
      alert('warning', 'Unable to get the topics! ', err.message);
    });
  };
  });
