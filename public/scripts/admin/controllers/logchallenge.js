'use strict';

/**
 * @ngdoc function
 * @name anyandgoApp.controller:LogChallengeCtrl
 * @description
 * # LogChallengeCtrl
 * Controller of the anyandgoApp
 */
angular.module('anyandgoApp')
  .controller('LogChallengeCtrl', function ($scope, Restangular) {
   $scope.logchallenges = Restangular.all("logchallenges").getList().$object;
  });
