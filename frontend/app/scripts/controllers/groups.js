'use strict';

angular.module('testAuthToken2App').controller('GroupsCtrl', function($interval, $scope, $http, API_URL, alert, $state, authToken) {
  $http.get(API_URL + 'mypage').success(function(groups) {
    if (groups.length < 1) {
      console.log('nada');
    }
    $scope.groups = groups;
    $scope.usernamel = authToken.getUsername();
    $state.go('mypage.groupsav');
  }).error(function(err) {
    alert('warning', 'Unable to get the groups! ', err.message);
  });

  var intervalPromise = $interval(function(){
    $http.get(API_URL + 'mypage').success(function(groups) {
      if (groups.length < 1) {
        console.log('nada');
      }
      $scope.groups = groups;
    }).error(function(err) {
      alert('warning', 'Unable to get the groups! ', err.message);
    });
  }, 10000);

  $scope.$on('$destroy', function () { $interval.cancel(intervalPromise); });
});
