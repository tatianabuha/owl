'use strict';

describe('Controller: AddcommentCtrl', function () {

  // load the controller's module
  beforeEach(module('testAuthToken2App'));

  var AddcommentCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    AddcommentCtrl = $controller('AddcommentCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(AddcommentCtrl.awesomeThings.length).toBe(3);
  });
});
