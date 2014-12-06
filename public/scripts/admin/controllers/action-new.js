'use strict';

/**
 * @ngdoc function
 * @name anyandgoApp.controller:ActionNewCtrl
 * @description
 * # ActionNewCtrl
 * Controller of the anyandgoApp
 */
angular.module('anyandgoApp')
  .controller('ActionNewCtrl', function ($scope, $location, Restangular) {
  $scope.save = function() {
    Restangular.all('actions').post($scope.action).then(function(action) {  
      if(navigator.userAgent.match(/Zombie/)) {
          document.location.hash = "#/crud/action";
      } else {
        $location.path('/crud/action');
      }
    });
  }
});
