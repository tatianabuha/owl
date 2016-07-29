'use strict';

describe('Controller: GroupcontentCtrl', function () {

  // load the controller's module
  beforeEach(module('testAuthToken2App'));

  var GroupcontentCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    GroupcontentCtrl = $controller('GroupcontentCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(GroupcontentCtrl.awesomeThings.length).toBe(3);
  });
});
