'use strict';

describe('Controller: AddtopicCtrl', function () {

  // load the controller's module
  beforeEach(module('testAuthToken2App'));

  var AddtopicCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    AddtopicCtrl = $controller('AddtopicCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(AddtopicCtrl.awesomeThings.length).toBe(3);
  });
});
