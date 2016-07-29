'use strict';

angular.module('testAuthToken2App').service('auth', function ($http, authToken, API_URL) {
  var url = API_URL + 'login';
  this.login = function (username, password) {
    return $http.post(url, {username: username, password: password}).success(function(res){
        authToken.setToken(res.token);
      });
    };
});
