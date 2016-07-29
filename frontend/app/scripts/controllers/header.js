'use strict';

angular.module('testAuthToken2App').controller('HeaderCtrl', function ($scope, $rootScope, authToken) {
      $scope.isAuthenticated = authToken.isAuthenticated;
      $rootScope.usernamel = authToken.getUsername();
  });
