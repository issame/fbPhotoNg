'use strict';

/**
 * @ngdoc function
 * @name fbphotoNgApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the fbphotoNgApp
 */

angular.module('fbphotoNgApp')
  .controller('MainCtrl', function($scope, $rootScope, $facebook,
    authService, albumService) {
    if ($scope.albums == undefined)
      $scope.albums = [];

    $scope.login = function() {
      authService.login();
    }
    $scope.logout = function() {
      authService.logout();
    }

    $scope.$watch("isLoggedIn", function(val) {
      if (val) {
        albumService.getAlbums()
          .then(function(data) {
            console.log(data)
            data.sort(function(a, b) {
              return a.name.localeCompare(b.name);
            });
            console.log(data)
            getCovers(data);
          }, function(error) {
            console.log('error', error);
          });
      }
    });

    function getCovers(input) {
      for (var i = 0; i < input.length; i++) {
        albumService.getCover(input[i])
          .then(function(data) {
            $scope.albums.push(data);
          }, function(error) {
            console.log('error', error);
          });
      }
    }
  });
