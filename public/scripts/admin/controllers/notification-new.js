'use strict';

/**
 * @ngdoc function
 * @name anyandgoApp.controller:NotificationNewCtrl
 * @description
 * # NotificationNewCtrl
 * Controller of the anyandgoApp
 */
angular.module('anyandgoApp')
  .controller('NotificationNewCtrl', function ($scope, $location, Restangular) {
  $scope.save = function() {
    Restangular.all('notifications').post($scope.notification).then(function(notification) {  
      if(navigator.userAgent.match(/Zombie/)) {
          document.location.hash = "#/crud/notification";
      } else {
        $location.path('/crud/notification');
      }
    });
  }
});
