'use strict';

/**
 * @ngdoc function
 * @name anyandgoApp.controller:NotificationTemplateCtrl
 * @description
 * # NotificationTemplateCtrl
 * Controller of the anyandgoApp
 */
angular.module('anyandgoApp')
  .controller('NotificationTemplateCtrl', function ($scope, Restangular) {
   $scope.notificationtemplates = Restangular.all("notificationtemplates").getList().$object;
  });
