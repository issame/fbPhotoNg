'use strict';

/**
 * @ngdoc service
 * @name fbphotoNgApp.uploader
 * @description
 * # uploader
 * Service in the fbphotoNgApp.
 */
angular.module('fbphotoNgApp')
  .service('S3UploadService', function($q, $http) {
    AWS.config.region = 'us-east-1';
    AWS.config.update({
      accessKeyId: '************************',
      secretAccessKey: '********************'
    });

    var bucket = new AWS.S3({
      params: {
        Bucket: 'issamebucket'
      }
    });

    this.Progress = 0;
    this.Upload = function(id, url) {
      var deferred = $q.defer();
      var filename = '';
      if (url.indexOf('?') == -1) {
        filename = url.substring(url.lastIndexOf('/') + 1);
      } else {
        filename = url.substring(url.lastIndexOf('/') + 1, url.lastIndexOf('?'));
      }
      $http.get(url, {
          responseType: "blob"
        })
        .then(function(result) {
          var blob = new Blob([result.data], {
            type: "image/jpg"
          });
          blob.lastModifiedDate = new Date();

          var file = new File([blob], id + '/' + filename)

          var params = {
            Bucket: 'issamebucket',
            Key: file.name,
            ContentType: file.type,
            Body: file
          };
          var options = {
            partSize: 1024,
            queueSize: 5,
            ACL: 'bucket-owner-full-control'
          };
          var uploader = bucket.putObject(params, options, function(err, data) {
            if (err) {
              deferred.reject(err);
            }
            deferred.resolve();
          });
          uploader.on('httpUploadProgress', function(event) {
            deferred.notify(event);
          });
        });
        return deferred.promise;
    };
  });
