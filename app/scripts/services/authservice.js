'use strict';

/**
 * @ngdoc service
 * @name fbphotoNgApp.authService
 * @description
 * # authService
 * Service in the fbphotoNgApp.
 */
angular.module('fbphotoNgApp')
  .service('authService', function($rootScope, $facebook, $q) {

    this.login = function() {
      $facebook.login().then(function() {
        refresh();
      })
    };

    this.logout = function() {
    $facebook.logout().then(function() {
        refresh();
        $rootScope.name = '';
        $rootScope.id = '';
        $rootScope.isLoggedIn = false;
      })
    };


    function refresh() {
      $facebook.api("/me").then(
        function(response) {
          //console.log(response);
          $rootScope.name = response.name;
          $rootScope.id = response.id;
          $rootScope.isLoggedIn = true;
        },
        function(err) {
          console.log(err);
          $rootScope.isLoggedIn = false;
        });
    }

  });
