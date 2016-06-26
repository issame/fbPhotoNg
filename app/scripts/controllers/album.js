'use strict';

/**
 * @ngdoc function
 * @name fbphotoNgApp.controller:AlbumCtrl
 * @description
 * # AlbumCtrl
 * Controller of the fbphotoNgApp
 */
angular.module('fbphotoNgApp')
  .controller('AlbumCtrl', function($scope, $routeParams, photoService, S3UploadService, $rootScope) {
    $scope.currentPage = 0;
    $scope.pageSize = 8;
    $scope.selected = {};
    $scope.isSelected = false;

    $scope.getNumber = function(num) {
      if (isNaN(num)) {
        num = 1;
      }
      return new Array(Math.ceil(num));
    }

    $scope.chPage = function(page) {
      $scope.currentPage = page;
    }

    $scope.download = function() {
      angular.forEach($scope.selected, function(key, val) {
        if (key) {
          S3UploadService.Upload($rootScope.id, val).then(function(result) {
            file.Success = true;
          }, function(error) {
            $scope.Error = error;
          }, function(progress) {
            angular.forEach($scope.photos, function(eachObj) {
              if (eachObj.images[0].source.indexOf(val) > -1) {
                eachObj.progress = Math.round(progress.loaded / progress.total * 100);
              }
            });
            //console.log(Math.round(progress.loaded / progress.total * 100) + '% done');
          });
        }
      });
    }

    $scope.getSelected = function() {
      $scope.isSelected = false;
      angular.forEach($scope.selected, function(key, val) {
        if (key) {
          $scope.isSelected = true;
        }
      });
    }

    $scope.albumId = $routeParams.id;
    photoService.getPhotos($routeParams.id)
      .then(function(data) {
        $scope.photos = data;
        angular.forEach(data, function(eachObj) {
          eachObj.progress = 0;
        });
        $scope.photos = data;
      }, function(error) {
        console.log('error', error);
      });
  });
