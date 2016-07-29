'use strict';

angular.module('testAuthToken2App').config(function($urlRouterProvider, $stateProvider, $httpProvider){
    $urlRouterProvider.otherwise('/');
    $stateProvider
    .state('main', {
      url:'/',
      templateUrl:'/views/main.html',
      controller: 'LoginCtrl',
      onEnter: function($state, authToken){
        if(authToken.isAuthenticated()){
          $state.go('mypage');
        }
      }
    })

    .state('register', {
      url:'/register',
      templateUrl:'/views/register.html',
      controller:'RegisterCtrl'
    })

    .state('mypage.addgroup', {
      templateUrl:'/views/addgroup.html',
      controller: 'AddgroupCtrl'
    })

    .state('mypage.addtopic', {
      templateUrl:'/views/addtopic.html',
      controller: 'AddtopicCtrl'
    })

    .state('mypage.addcomment', {
      templateUrl:'/views/addcomment.html'
    })

    .state('mypage.groupsav', {
      templateUrl:'/views/groupsav.html',
      controller: 'GroupsavCtrl'
    })

    .state('mypage.addtopic.getcontent', {
      templateUrl:'/views/getcontent.html',
      controller: 'GroupcontentCtrl'
    })

    .state('logout', {
      url:'/logout',
      controller:'LogoutCtrl'
    })

    .state('mypage', {
      url:'/mypage',
      templateUrl:'/views/mypage.html',
      controller: 'GroupsCtrl'
    });

    $httpProvider.interceptors.push('authInterceptor');
  })
.constant('API_URL', 'http://localhost:3000/');
