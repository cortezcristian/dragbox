'use strict';

/**
 * @ngdoc function
 * @name anyandgoApp.controller:RewardCtrl
 * @description
 * # RewardCtrl
 * Controller of the anyandgoApp
 */
angular.module('anyandgoApp')
  .controller('RewardCtrl', function ($scope, Restangular) {
   $scope.rewards = Restangular.all("rewards").getList().$object;
  });
