'use strict';

/**
 * @ngdoc function
 * @name anyandgoApp.controller:LogChallengeEditCtrl
 * @description
 * # LogChallengeEditCtrl
 * Controller of the anyandgoApp
 */
angular.module('anyandgoApp')
  .controller('LogChallengeEditCtrl', function ($scope, $location, Restangular, logchallenge) {
  var original = logchallenge;
  $scope.logchallenge = Restangular.copy(original);
  

  $scope.isClean = function() {
    return angular.equals(original, $scope.logchallenge);
  }

  $scope.destroy = function() {
    original.remove().then(function() {
      if(navigator.userAgent.match(/Zombie/)) {
          document.location.hash = "#/crud/logchallenge";
      } else {
        $location.path('/crud/logchallenge');
      }
    });
  };

  $scope.save = function() {
    $scope.logchallenge.put().then(function() {
      if(navigator.userAgent.match(/Zombie/)) {
          document.location.hash = "#/crud/logchallenge";
      } else {
        $location.path('/crud/logchallenge');
      }
    });
  };
});
