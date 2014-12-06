'use strict';

/**
 * @ngdoc function
 * @name anyandgoApp.controller:LogRewardEditCtrl
 * @description
 * # LogRewardEditCtrl
 * Controller of the anyandgoApp
 */
angular.module('anyandgoApp')
  .controller('LogRewardEditCtrl', function ($scope, $location, Restangular, logreward) {
  var original = logreward;
  $scope.logreward = Restangular.copy(original);
  

  $scope.isClean = function() {
    return angular.equals(original, $scope.logreward);
  }

  $scope.destroy = function() {
    original.remove().then(function() {
      if(navigator.userAgent.match(/Zombie/)) {
          document.location.hash = "#/crud/logreward";
      } else {
        $location.path('/crud/logreward');
      }
    });
  };

  $scope.save = function() {
    $scope.logreward.put().then(function() {
      if(navigator.userAgent.match(/Zombie/)) {
          document.location.hash = "#/crud/logreward";
      } else {
        $location.path('/crud/logreward');
      }
    });
  };
});
