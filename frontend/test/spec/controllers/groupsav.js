'use strict';

describe('Controller: GroupsavCtrl', function () {

  // load the controller's module
  beforeEach(module('testAuthToken2App'));

  var GroupsavCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    GroupsavCtrl = $controller('GroupsavCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(GroupsavCtrl.awesomeThings.length).toBe(3);
  });
});
