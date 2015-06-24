'use strict';

angular.module('bodhiStudentAui')
  .controller('PermissionAllCtrl', ['$scope', '$timeout', '$state', 
    'Permission','RestHelper','ModelHelper',
    function($scope, $timeout, $state, Permission,RestHelper,ModelHelper) {

      
      $scope.loadModels = ModelHelper.loadModels(Permission,$scope);
      $scope.onUpdate = ModelHelper.updateModel();
      $scope.destroyModel = ModelHelper.destroyModel($scope,Permission);

      $scope.loadModels(1);
    }
  ]);
