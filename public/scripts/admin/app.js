'use strict';
/*
$(document).ready(function(){
    $('#side-menu').metisMenu();
    $('head').append('<link rel="stylesheet" type="text/css" href="http://visionmedia.github.io/mocha/example/mocha.css">');
    $.get('/tasks/test', function(data){
        $('.main-con .panel').html(data);
    });
});
*/

/**
 * @ngdoc overview
 * @name anyandgoApp
 * @description
 * # anyandgoApp
 *
 * Main module of the application.
 */
angular
  .module('anyandgoApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'toggle-switch',
    'restangular'
  ])
  .config(function ($routeProvider, $locationProvider, RestangularProvider) {
    //$locationProvider.html5Mode(true).hashPrefix('!');
    $routeProvider
      .when('/', {
        templateUrl: '/scripts/admin/views/main.html',
        controller: 'MainCtrl'
      })
      .when('/crud/sample', {
        templateUrl: '/scripts/admin/views/sample.html',
        controller: 'SampleCtrl'
      })
      .when('/crud/sample-new', {
        templateUrl: '/forms/sample/create',
        controller: 'SampleNewCtrl'
      })
      .when('/crud/sample-edit/:id', {
        templateUrl: '/forms/sample/create',
        controller: 'SampleEditCtrl',
        resolve: {
          sample: function(Restangular, $route){
            return Restangular.one('samples', $route.current.params.id).get();
          }
        }
      })
      .when('/crud/challenge', {
        templateUrl: '/scripts/admin/views/challenge.html',
        controller: 'ChallengeCtrl'
      })
      .when('/crud/challenge-new', {
        templateUrl: '/forms/challenge/create',
        controller: 'ChallengeNewCtrl'
      })
      .when('/crud/challenge-edit/:id', {
        templateUrl: '/forms/challenge/create',
        controller: 'ChallengeEditCtrl',
        resolve: {
          challenge: function(Restangular, $route){
            return Restangular.one('challenges', $route.current.params.id).get();
          }
        }
      })
      .when('/crud/rule', {
        templateUrl: '/scripts/admin/views/rule.html',
        controller: 'RuleCtrl'
      })
      .when('/crud/rule-new', {
        templateUrl: '/forms/rule/create',
        controller: 'RuleNewCtrl'
      })
      .when('/crud/rule-edit/:id', {
        templateUrl: '/forms/rule/create',
        controller: 'RuleEditCtrl',
        resolve: {
          rule: function(Restangular, $route){
            return Restangular.one('rules', $route.current.params.id).get();
          }
        }
      })
      .when('/crud/action', {
        templateUrl: '/scripts/admin/views/action.html',
        controller: 'ActionCtrl'
      })
      .when('/crud/action-new', {
        templateUrl: '/forms/action/create',
        controller: 'ActionNewCtrl'
      })
      .when('/crud/action-edit/:id', {
        templateUrl: '/forms/action/create',
        controller: 'ActionEditCtrl',
        resolve: {
          action: function(Restangular, $route){
            return Restangular.one('actions', $route.current.params.id).get();
          }
        }
      })
      .when('/crud/reward', {
        templateUrl: '/scripts/admin/views/reward.html',
        controller: 'RewardCtrl'
      })
      .when('/crud/reward-new', {
        templateUrl: '/forms/reward/create',
        controller: 'RewardNewCtrl'
      })
      .when('/crud/reward-edit/:id', {
        templateUrl: '/forms/reward/create',
        controller: 'RewardEditCtrl',
        resolve: {
          reward: function(Restangular, $route){
            return Restangular.one('rewards', $route.current.params.id).get();
          }
        }
      })
      .when('/crud/notification', {
        templateUrl: '/scripts/admin/views/notification.html',
        controller: 'NotificationCtrl'
      })
      .when('/crud/notification-new', {
        templateUrl: '/forms/notification/create',
        controller: 'NotificationNewCtrl'
      })
      .when('/crud/notification-edit/:id', {
        templateUrl: '/forms/notification/create',
        controller: 'NotificationEditCtrl',
        resolve: {
          notification: function(Restangular, $route){
            return Restangular.one('notifications', $route.current.params.id).get();
          }
        }
      })
      .when('/crud/notificationtemplate', {
        templateUrl: '/scripts/admin/views/notificationtemplate.html',
        controller: 'NotificationTemplateCtrl'
      })
      .when('/crud/notificationtemplate-new', {
        templateUrl: '/forms/notificationtemplate/create',
        controller: 'NotificationTemplateNewCtrl'
      })
      .when('/crud/notificationtemplate-edit/:id', {
        templateUrl: '/forms/notificationtemplate/create',
        controller: 'NotificationTemplateEditCtrl',
        resolve: {
          notificationtemplate: function(Restangular, $route){
            return Restangular.one('notificationtemplates', $route.current.params.id).get();
          }
        }
      })
      .when('/crud/logaction', {
        templateUrl: '/scripts/admin/views/logaction.html',
        controller: 'LogActionCtrl'
      })
      .when('/crud/logaction-new', {
        templateUrl: '/forms/logaction/create',
        controller: 'LogActionNewCtrl'
      })
      .when('/crud/logaction-edit/:id', {
        templateUrl: '/forms/logaction/create',
        controller: 'LogActionEditCtrl',
        resolve: {
          logaction: function(Restangular, $route){
            return Restangular.one('logactions', $route.current.params.id).get();
          }
        }
      })
      .when('/crud/logreward', {
        templateUrl: '/scripts/admin/views/logreward.html',
        controller: 'LogRewardCtrl'
      })
      .when('/crud/logreward-new', {
        templateUrl: '/forms/logreward/create',
        controller: 'LogRewardNewCtrl'
      })
      .when('/crud/logreward-edit/:id', {
        templateUrl: '/forms/logreward/create',
        controller: 'LogRewardEditCtrl',
        resolve: {
          logreward: function(Restangular, $route){
            return Restangular.one('logrewards', $route.current.params.id).get();
          }
        }
      })
      .when('/crud/logchallenge', {
        templateUrl: '/scripts/admin/views/logchallenge.html',
        controller: 'LogChallengeCtrl'
      })
      .when('/crud/logchallenge-new', {
        templateUrl: '/forms/logchallenge/create',
        controller: 'LogChallengeNewCtrl'
      })
      .when('/crud/logchallenge-edit/:id', {
        templateUrl: '/forms/logchallenge/create',
        controller: 'LogChallengeEditCtrl',
        resolve: {
          logchallenge: function(Restangular, $route){
            return Restangular.one('logchallenges', $route.current.params.id).get();
          }
        }
      })
      .when('/crud/user', {
        templateUrl: '/scripts/admin/views/user.html',
        controller: 'UserCtrl'
      })
      .when('/crud/user-new', {
        templateUrl: '/forms/user/create',
        controller: 'UserNewCtrl'
      })
      .when('/crud/user-edit/:id', {
        templateUrl: '/forms/user/create',
        controller: 'UserEditCtrl',
        resolve: {
          user: function(Restangular, $route){
            return Restangular.one('users', $route.current.params.id).get();
          }
        }
      })
      .otherwise({










        redirectTo: '/'
      });
      
      RestangularProvider.setBaseUrl('/api/v1');
      RestangularProvider.setRestangularFields({
        id: '_id'
      });
      
      RestangularProvider.setRequestInterceptor(function(elem, operation, what) {
        
        if (operation === 'put') {
          elem._id = undefined;
          return elem;
        }
        return elem;
      });
  });

