'use strict';

/**
 * @ngdoc function
 * @name anyandgoApp.controller:LogChallengeNewCtrl
 * @description
 * # LogChallengeNewCtrl
 * Controller of the anyandgoApp
 */
angular.module('anyandgoApp')
  .controller('LogChallengeNewCtrl', function ($scope, $location, Restangular) {
  $scope.save = function() {
    Restangular.all('logchallenges').post($scope.logchallenge).then(function(logchallenge) {  
      if(navigator.userAgent.match(/Zombie/)) {
          document.location.hash = "#/crud/logchallenge";
      } else {
        $location.path('/crud/logchallenge');
      }
    });
  }
});
