'use strict';

/**
 * @ngdoc function
 * @name anyandgoApp.controller:LogRewardCtrl
 * @description
 * # LogRewardCtrl
 * Controller of the anyandgoApp
 */
angular.module('anyandgoApp')
  .controller('LogRewardCtrl', function ($scope, Restangular) {
   $scope.logrewards = Restangular.all("logrewards").getList().$object;
  });
