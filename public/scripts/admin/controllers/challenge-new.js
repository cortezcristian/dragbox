'use strict';

/**
 * @ngdoc function
 * @name anyandgoApp.controller:ChallengeNewCtrl
 * @description
 * # ChallengeNewCtrl
 * Controller of the anyandgoApp
 */
angular.module('anyandgoApp')
  .controller('ChallengeNewCtrl', function ($scope, $location, Restangular) {
  $scope.save = function() {
    Restangular.all('challenges').post($scope.challenge).then(function(challenge) {  
      if(navigator.userAgent.match(/Zombie/)) {
          document.location.hash = "#/crud/challenge";
      } else {
        $location.path('/crud/challenge');
      }
    });
  }
});
