'use strict';

angular.module('testAuthToken2App').filter('reverse', function() {
  return function(items) {
    if( !items ){ return; }
    return items.slice().reverse();
  };
});
