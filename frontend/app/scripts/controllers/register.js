'use strict';

angular.module('testAuthToken2App').controller('RegisterCtrl', function ($scope, $http, $state, alert, authToken, API_URL) {
    $scope.submit = function(){
      var url = API_URL + 'register';
      var user = {
        username: $scope.username,
        password: $scope.password,
        firstname: $scope.firstname,
        lastname: $scope.lastname
      };
      $http.post(url, user)
        .success(function(res){
          alert('success', 'Account created! ', 'Welcome, ' + user.username + '!');
          authToken.setToken(res.token);
          $state.go('mypage');
        })
        .error(function(err){
          console.log(err);
          alert('warning', 'Something went wrong :(', err.message);
        });
    };
  });
