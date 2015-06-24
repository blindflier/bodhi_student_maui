'use strict';

angular.module('bodhiStudentAui')
  .controller('UserAllCtrl', ['$scope', '$timeout', '$state', 
    'User','RestHelper','ModelHelper',
    function($scope, $timeout, $state, User,RestHelper,ModelHelper) {

      
      $scope.loadModels = ModelHelper.loadModels(User,$scope);
      $scope.onUpdate = ModelHelper.updateModel();
      $scope.destroyModel = ModelHelper.destroyModel($scope,User);

      $scope.loadModels(1);
    }
  ]);
