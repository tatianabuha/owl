'use strict';

angular.module('testAuthToken2App').controller('AddtopicCtrl', function($scope, $http, API_URL, authToken, alert, $state) {
  $scope.submit = function() {
    var url = API_URL + 'addtopic';
    var currentDate = Date();
    var token = authToken.getToken();
    var topic = {
      groupname: $scope.groupname,
      text: $scope.topictext,
      createDate: currentDate,
      token: token,
      username: $scope.usernamel,
      comments: []
    };
    $http.post(url, topic)
      .success(function() {
        alert('success', 'Topic created!');
        $state.go('mypage.addtopic.getcontent');
        $scope.topics.push(topic);
        $scope.topictext = null;
      })
      .error(function(err) {
        alert('warning', 'You have no power here! ', err.message);
      });

  };
});
