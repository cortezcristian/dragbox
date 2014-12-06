'use strict';

/**
 * @ngdoc function
 * @name anyandgoApp.controller:RewardEditCtrl
 * @description
 * # RewardEditCtrl
 * Controller of the anyandgoApp
 */
angular.module('anyandgoApp')
  .controller('RewardEditCtrl', function ($scope, $location, Restangular, reward) {
  var original = reward;
  $scope.reward = Restangular.copy(original);
  

  $scope.isClean = function() {
    return angular.equals(original, $scope.reward);
  }

  $scope.destroy = function() {
    original.remove().then(function() {
      if(navigator.userAgent.match(/Zombie/)) {
          document.location.hash = "#/crud/reward";
      } else {
        $location.path('/crud/reward');
      }
    });
  };

  $scope.save = function() {
    $scope.reward.put().then(function() {
      if(navigator.userAgent.match(/Zombie/)) {
          document.location.hash = "#/crud/reward";
      } else {
        $location.path('/crud/reward');
      }
    });
  };
});
