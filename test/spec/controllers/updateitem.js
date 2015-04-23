'use strict';

describe('Controller: UpdateitemCtrl', function () {

  // load the controller's module
  beforeEach(module('411t2App'));

  var UpdateitemCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    UpdateitemCtrl = $controller('UpdateitemCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
