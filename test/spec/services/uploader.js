'use strict';

describe('Service: uploader', function () {

  // load the service's module
  beforeEach(module('fbphotoNgApp'));

  // instantiate service
  var uploader;
  beforeEach(inject(function (_uploader_) {
    uploader = _uploader_;
  }));

  it('should do something', function () {
    expect(!!uploader).toBe(true);
  });

});
