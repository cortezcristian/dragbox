'use strict';

/**
 * @ngdoc function
 * @name anyandgoApp.controller:LogActionCtrl
 * @description
 * # LogActionCtrl
 * Controller of the anyandgoApp
 */
angular.module('anyandgoApp')
  .controller('LogActionCtrl', function ($scope, Restangular) {
   $scope.logactions = Restangular.all("logactions").getList().$object;
  });
