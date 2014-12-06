'use strict';

/**
 * @ngdoc function
 * @name anyandgoApp.controller:ChallengeEditCtrl
 * @description
 * # ChallengeEditCtrl
 * Controller of the anyandgoApp
 */
angular.module('anyandgoApp')
  .controller('ChallengeEditCtrl', function ($scope, $location, Restangular, challenge) {
  var original = challenge;
  $scope.challenge = Restangular.copy(original);
  

  $scope.isClean = function() {
    return angular.equals(original, $scope.challenge);
  }

  $scope.destroy = function() {
    original.remove().then(function() {
      if(navigator.userAgent.match(/Zombie/)) {
          document.location.hash = "#/crud/challenge";
      } else {
        $location.path('/crud/challenge');
      }
    });
  };

  $scope.save = function() {
    $scope.challenge.put().then(function() {
      if(navigator.userAgent.match(/Zombie/)) {
          document.location.hash = "#/crud/challenge";
      } else {
        $location.path('/crud/challenge');
      }
    });
  };
});
