'use strict';

angular.module('testAuthToken2App').controller('GroupsCtrl', function($interval, $scope, $http, API_URL, alert, $state) {
  $interval(function () {
    $scope.reload;
  }, 10,10000);
  $http.get(API_URL + 'mypage').success(function(groups) {
    if (groups.length < 1) {
      groups.push('No groups found...');
    }
    $scope.groups = groups;
    $state.go('.groupsav');
  }).error(function(err) {
    alert('warning', 'Unable to get the groups! ', err.message);
  });

});
