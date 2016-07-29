'use strict';

angular.module('testAuthToken2App').controller('AddcommentCtrl', function($rootScope, $scope, $http, API_URL, authToken, $state) {
  $scope.submit = function() {
    var url = API_URL + 'addcomment';
    var currentDate = Date();
    var token = authToken.getToken();
    console.log($scope.topic._id);
    var comment = {
      topicId: $scope.topic._id,
      ctext: $scope.commenttext,
      ccreateDate: currentDate,
      token: token,
      usernameT: $scope.usernamel
    };

    $scope.topic.comments.push(comment);
    $scope.commenttext = null;
    $http.post(url, comment)
      .success(function() {
        $state.go('mypage.addtopic.getcontent');
      })
      .error(function(err) {
        console.log(err);
      });
  };
});
