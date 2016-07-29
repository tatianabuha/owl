'use strict';

angular.module('testAuthToken2App').controller('AddgroupCtrl', function ($scope, alert, $state, API_URL, $http, authToken) {
  $scope.submit = function(){
    var url = API_URL + 'addgroup';
    var currentDate = new Date();
    var token = authToken.getToken();
    var group = {
      name: $scope.groupname,
      createDate: currentDate,
      token: token
    };
    $http.post(url, group)
    .success(function(res){
      alert('success', 'Group created! ', res);
      $state.go('mypage');
      $scope.groups.push(group.name);
    })
    .error(function(err){
      console.log(err);
      alert('warning', 'Something went wrong ', ':(');
    });
  };
});
