'use strict';

/**
 * @ngdoc function
 * @name anyandgoApp.controller:LogActionEditCtrl
 * @description
 * # LogActionEditCtrl
 * Controller of the anyandgoApp
 */
angular.module('anyandgoApp')
  .controller('LogActionEditCtrl', function ($scope, $location, Restangular, logaction) {
  var original = logaction;
  $scope.logaction = Restangular.copy(original);
  

  $scope.isClean = function() {
    return angular.equals(original, $scope.logaction);
  }

  $scope.destroy = function() {
    original.remove().then(function() {
      if(navigator.userAgent.match(/Zombie/)) {
          document.location.hash = "#/crud/logaction";
      } else {
        $location.path('/crud/logaction');
      }
    });
  };

  $scope.save = function() {
    $scope.logaction.put().then(function() {
      if(navigator.userAgent.match(/Zombie/)) {
          document.location.hash = "#/crud/logaction";
      } else {
        $location.path('/crud/logaction');
      }
    });
  };
});
