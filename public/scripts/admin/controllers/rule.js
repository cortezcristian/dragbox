'use strict';

/**
 * @ngdoc function
 * @name anyandgoApp.controller:RuleCtrl
 * @description
 * # RuleCtrl
 * Controller of the anyandgoApp
 */
angular.module('anyandgoApp')
  .controller('RuleCtrl', function ($scope, Restangular) {
   $scope.rules = Restangular.all("rules").getList().$object;
  });
