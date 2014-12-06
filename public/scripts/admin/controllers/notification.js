'use strict';

/**
 * @ngdoc function
 * @name anyandgoApp.controller:NotificationCtrl
 * @description
 * # NotificationCtrl
 * Controller of the anyandgoApp
 */
angular.module('anyandgoApp')
  .controller('NotificationCtrl', function ($scope, Restangular) {
   $scope.notifications = Restangular.all("notifications").getList().$object;
  });
