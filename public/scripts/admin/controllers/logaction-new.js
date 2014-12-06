'use strict';

/**
 * @ngdoc function
 * @name anyandgoApp.controller:LogActionNewCtrl
 * @description
 * # LogActionNewCtrl
 * Controller of the anyandgoApp
 */
angular.module('anyandgoApp')
  .controller('LogActionNewCtrl', function ($scope, $location, Restangular) {
  $scope.save = function() {
    Restangular.all('logactions').post($scope.logaction).then(function(logaction) {  
      if(navigator.userAgent.match(/Zombie/)) {
          document.location.hash = "#/crud/logaction";
      } else {
        $location.path('/crud/logaction');
      }
    });
  }
});
