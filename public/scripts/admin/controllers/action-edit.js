'use strict';

/**
 * @ngdoc function
 * @name anyandgoApp.controller:ActionEditCtrl
 * @description
 * # ActionEditCtrl
 * Controller of the anyandgoApp
 */
angular.module('anyandgoApp')
  .controller('ActionEditCtrl', function ($scope, $location, Restangular, action) {
  var original = action;
  $scope.action = Restangular.copy(original);
  

  $scope.isClean = function() {
    return angular.equals(original, $scope.action);
  }

  $scope.destroy = function() {
    original.remove().then(function() {
      if(navigator.userAgent.match(/Zombie/)) {
          document.location.hash = "#/crud/action";
      } else {
        $location.path('/crud/action');
      }
    });
  };

  $scope.save = function() {
    $scope.action.put().then(function() {
      if(navigator.userAgent.match(/Zombie/)) {
          document.location.hash = "#/crud/action";
      } else {
        $location.path('/crud/action');
      }
    });
  };
});
