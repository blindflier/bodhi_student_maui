'use strict';

angular.module('bodhiStudentAui')
  .controller('RoleAllCtrl', ['$scope', '$timeout', '$state', 
    'Role','RestHelper','ModelHelper',
    function($scope, $timeout, $state, Role,RestHelper,ModelHelper) {

      
      $scope.loadModels = ModelHelper.loadModels(Role,$scope);
      $scope.onUpdate = ModelHelper.updateModel();
      $scope.destroyModel = ModelHelper.destroyModel($scope,Role);

      $scope.loadModels(1);
    }
  ]);
