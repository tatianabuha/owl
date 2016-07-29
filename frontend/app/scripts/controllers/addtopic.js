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
      .success(function(res) {
        alert('success', 'Topic created!');
        $state.go('mypage.addtopic.getcontent');
        $scope.topics.push(res);
        $scope.topictext = null;
        var group = {
          groupname: topic.groupname
        };
        var url = API_URL + 'content';
        var config = {
          params: group
        };
        $http.get(url, config).success(function(topics) {
          if (topics.length < 1) {
            console.log('nada');
          }
          $scope.topics = topics;
        }).error(function(err) {
          alert('warning', 'Unable to get the topics! ', err.message);
        });
      })
      .error(function(err) {
        alert('warning', 'You have no power here! ', err.message);
      });

  };
});
