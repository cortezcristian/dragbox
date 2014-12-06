'use strict';

/**
 * @ngdoc function
 * @name anyandgoApp.controller:RuleNewCtrl
 * @description
 * # RuleNewCtrl
 * Controller of the anyandgoApp
 */
angular.module('anyandgoApp')
  .controller('RuleNewCtrl', function ($scope, $location, Restangular) {
  $scope.save = function() {
    Restangular.all('rules').post($scope.rule).then(function(rule) {  
      if(navigator.userAgent.match(/Zombie/)) {
          document.location.hash = "#/crud/rule";
      } else {
        $location.path('/crud/rule');
      }
    });
  }
});
