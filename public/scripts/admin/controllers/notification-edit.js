'use strict';

/**
 * @ngdoc function
 * @name anyandgoApp.controller:NotificationEditCtrl
 * @description
 * # NotificationEditCtrl
 * Controller of the anyandgoApp
 */
angular.module('anyandgoApp')
  .controller('NotificationEditCtrl', function ($scope, $location, Restangular, notification) {
  var original = notification;
  $scope.notification = Restangular.copy(original);
  

  $scope.isClean = function() {
    return angular.equals(original, $scope.notification);
  }

  $scope.destroy = function() {
    original.remove().then(function() {
      if(navigator.userAgent.match(/Zombie/)) {
          document.location.hash = "#/crud/notification";
      } else {
        $location.path('/crud/notification');
      }
    });
  };

  $scope.save = function() {
    $scope.notification.put().then(function() {
      if(navigator.userAgent.match(/Zombie/)) {
          document.location.hash = "#/crud/notification";
      } else {
        $location.path('/crud/notification');
      }
    });
  };
});
