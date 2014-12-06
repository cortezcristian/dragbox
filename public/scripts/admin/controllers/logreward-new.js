'use strict';

/**
 * @ngdoc function
 * @name anyandgoApp.controller:LogRewardNewCtrl
 * @description
 * # LogRewardNewCtrl
 * Controller of the anyandgoApp
 */
angular.module('anyandgoApp')
  .controller('LogRewardNewCtrl', function ($scope, $location, Restangular) {
  $scope.save = function() {
    Restangular.all('logrewards').post($scope.logreward).then(function(logreward) {  
      if(navigator.userAgent.match(/Zombie/)) {
          document.location.hash = "#/crud/logreward";
      } else {
        $location.path('/crud/logreward');
      }
    });
  }
});
