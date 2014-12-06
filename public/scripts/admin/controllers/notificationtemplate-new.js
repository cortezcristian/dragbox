'use strict';

/**
 * @ngdoc function
 * @name anyandgoApp.controller:NotificationTemplateNewCtrl
 * @description
 * # NotificationTemplateNewCtrl
 * Controller of the anyandgoApp
 */
angular.module('anyandgoApp')
  .controller('NotificationTemplateNewCtrl', function ($scope, $location, Restangular) {
  $scope.save = function() {
    Restangular.all('notificationtemplates').post($scope.notificationtemplate).then(function(notificationtemplate) {  
      if(navigator.userAgent.match(/Zombie/)) {
          document.location.hash = "#/crud/notificationtemplate";
      } else {
        $location.path('/crud/notificationtemplate');
      }
    });
  }
});
