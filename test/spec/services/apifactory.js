'use strict';

describe('Service: APIFactory', function () {

  // load the service's module
  beforeEach(module('411t2App'));

  // instantiate service
  var APIFactory;
  beforeEach(inject(function (_APIFactory_) {
    APIFactory = _APIFactory_;
  }));

  it('should do something', function () {
    expect(!!APIFactory).toBe(true);
  });

});
