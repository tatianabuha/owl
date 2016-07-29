'use strict';

angular.module('testAuthToken2App').controller('GroupsavCtrl', function ($scope, $http, API_URL, alert) {
  var user = {
    groups: $scope.groups
  };
  var url = API_URL + 'groupsav';
  var config = {
    params: user
  };
  $http.get(url, config).success(function(groupsDb) {
    if (groupsDb.length < 1) {
       groupsDb.push('No groups found...');
    }
    for (var i = 0; i < user.groups.length; i++) {
        for (var j = 0; j < groupsDb.length; j++) {
            if (user.groups[i] === groupsDb[j]){
              groupsDb.splice(j, 1);
            }
        }
    }
    $scope.groupsav = groupsDb;
  }).error(function(err) {
    alert('warning', 'Unable to get the groups! ', err.message);
  });
});
