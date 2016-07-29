'use strict';
angular.module('testAuthToken2App').factory('authToken', function ($window) {
    var storage = $window.localStorage;
    var cachedToken;
    var cachedUsername;
    var userName = 'userName';
    var userToken = 'userToken';
    var setToken = function(token){
        cachedToken = token;
        storage.setItem(userToken, token);
      };
    var getToken = function(){
        if(!cachedToken){
          cachedToken = storage.getItem(userToken);
        }
        return cachedToken;
      };
    var isAuthenticated = function(){
        return !!getToken();
      };
    var removeToken = function(){
        cachedToken = null;
        storage.removeItem(userToken);
      };
    var setUsername = function(username){
      cachedUsername = username;
      storage.setItem(userName, username);
    };
    var getUsername = function(){
      if(!cachedUsername){
        cachedUsername = storage.getItem(userName);
      }
      return cachedUsername;
    };
    return{
      setToken: setToken,
      getToken: getToken,
      isAuthenticated: isAuthenticated,
      removeToken: removeToken,
      setUsername: setUsername,
      getUsername: getUsername
    };
  });
