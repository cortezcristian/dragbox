'use strict';

/**
 * @ngdoc function
 * @name anyandgoApp.controller:NotificationTemplateEditCtrl
 * @description
 * # NotificationTemplateEditCtrl
 * Controller of the anyandgoApp
 */
angular.module('anyandgoApp')
  .controller('NotificationTemplateEditCtrl', function ($scope, $location, Restangular, notificationtemplate) {
  var original = notificationtemplate;
  $scope.notificationtemplate = Restangular.copy(original);
  

  $scope.isClean = function() {
    return angular.equals(original, $scope.notificationtemplate);
  }

  $scope.destroy = function() {
    original.remove().then(function() {
      if(navigator.userAgent.match(/Zombie/)) {
          document.location.hash = "#/crud/notificationtemplate";
      } else {
        $location.path('/crud/notificationtemplate');
      }
    });
  };

  $scope.save = function() {
    $scope.notificationtemplate.put().then(function() {
      if(navigator.userAgent.match(/Zombie/)) {
          document.location.hash = "#/crud/notificationtemplate";
      } else {
        $location.path('/crud/notificationtemplate');
      }
    });
  };
});
