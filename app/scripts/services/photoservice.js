'use strict';

/**
 * @ngdoc service
 * @name fbphotoNgApp.photoService
 * @description
 * # photoService
 * Service in the fbphotoNgApp.
 */
angular.module('fbphotoNgApp')
  .service('photoService', function($facebook) {
    return {
      getPhotos: function(id) {
        return $facebook.cachedApi('/' + id + '/photos?fields=id,images')
          .then(function(response) {
            return response.data;
          });
      }
    }
  });
