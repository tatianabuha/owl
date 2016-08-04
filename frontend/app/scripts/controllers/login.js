'use strict';

angular.module('testAuthToken2App').controller('LoginCtrl', function ($scope, alert, auth, $state, $rootScope, authToken) {
  $scope.submit = function(){
    auth.login($scope.username, $scope.password)
      .success(function(res){
        alert('success', 'Welcome! ', 'Thanks for coming back, ' + res.user.username + '!');
        authToken.setUsername(res.user.username);
        $state.go('mypage');
      })
      .error(function(err){
        alert('warning', 'Something went wrong. ', err.message);
      });
  };
  });
