'use strict';

angular.module('testAuthToken2App')
  .service('alert', function alert($rootScope, $timeout) {
    var alertTimeout;
    return function(type, title, message, timeout){
      $rootScope.alert = {
        hasBeenShown: true,
        show: true,
        type: type,
        message: message,
        title: title
      };
      $timeout.cancel(alertTimeout);
      alertTimeout = $timeout(function(){
        $rootScope.alert.show = false;
      }, timeout || 2500);
    };
  });
