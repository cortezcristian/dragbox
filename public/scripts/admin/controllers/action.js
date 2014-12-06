'use strict';

/**
 * @ngdoc function
 * @name anyandgoApp.controller:ActionCtrl
 * @description
 * # ActionCtrl
 * Controller of the anyandgoApp
 */
angular.module('anyandgoApp')
  .controller('ActionCtrl', function ($scope, Restangular) {
   $scope.actions = Restangular.all("actions").getList().$object;
  });
