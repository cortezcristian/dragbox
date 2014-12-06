'use strict';

/**
 * @ngdoc function
 * @name anyandgoApp.controller:RewardNewCtrl
 * @description
 * # RewardNewCtrl
 * Controller of the anyandgoApp
 */
angular.module('anyandgoApp')
  .controller('RewardNewCtrl', function ($scope, $location, Restangular) {
  $scope.save = function() {
    Restangular.all('rewards').post($scope.reward).then(function(reward) {  
      if(navigator.userAgent.match(/Zombie/)) {
          document.location.hash = "#/crud/reward";
      } else {
        $location.path('/crud/reward');
      }
    });
  }
});
