'use strict';

/**
 * @ngdoc function
 * @name anyandgoApp.controller:RuleEditCtrl
 * @description
 * # RuleEditCtrl
 * Controller of the anyandgoApp
 */
angular.module('anyandgoApp')
  .controller('RuleEditCtrl', function ($scope, $location, Restangular, rule) {
  var original = rule;
  $scope.rule = Restangular.copy(original);
  

  $scope.isClean = function() {
    return angular.equals(original, $scope.rule);
  }

  $scope.destroy = function() {
    original.remove().then(function() {
      if(navigator.userAgent.match(/Zombie/)) {
          document.location.hash = "#/crud/rule";
      } else {
        $location.path('/crud/rule');
      }
    });
  };

  $scope.save = function() {
    $scope.rule.put().then(function() {
      if(navigator.userAgent.match(/Zombie/)) {
          document.location.hash = "#/crud/rule";
      } else {
        $location.path('/crud/rule');
      }
    });
  };
});
