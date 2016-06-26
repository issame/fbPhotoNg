'use strict';

/**
 * @ngdoc service
 * @name fbphotoNgApp.albumService
 * @description
 * # albumService
 * Service in the fbphotoNgApp.
 */
angular.module('fbphotoNgApp')
  .service('albumService', function($q, $facebook) {
    return {
      getAlbums: function() {
        return $facebook.cachedApi('/me/albums')
          .then(function(response) {
            return response.data;
          });
      },
      getCover: function(album) {
        return $facebook.cachedApi('/' + album.id + '/picture?type=album')
          .then(function(response) {
            var _id = album.id;
            var _title = album.name;
            var _album = {
              'id': _id,
              'title': _title,
              'cover': response.data.url
            }
            response.data = _album;
            return response.data;
          });
      }
    };
  });
