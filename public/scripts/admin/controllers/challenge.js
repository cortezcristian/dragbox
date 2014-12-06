'use strict';

/**
 * @ngdoc function
 * @name anyandgoApp.controller:ChallengeCtrl
 * @description
 * # ChallengeCtrl
 * Controller of the anyandgoApp
 */
angular.module('anyandgoApp')
  .controller('ChallengeCtrl', function ($scope, Restangular) {
   $scope.challenges = Restangular.all("challenges").getList().$object;
  });
