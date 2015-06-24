'use strict';

angular.module('bodhiStudentAui')
  .controller('GradeinfoAllCtrl', ['$scope', '$timeout', '$state', 
    'Grade','RestHelper','AllCities','ModelHelper',
    function($scope, $timeout, $state, Grade,RestHelper,AllCities,ModelHelper) {

      $scope.cities = AllCities;
      $scope.city = $scope.cities[0];
    
      $scope.loadModels = ModelHelper.loadModels(Grade,$scope);
      $scope.onUpdate = ModelHelper.updateModel();
      $scope.destroyModel = ModelHelper.destroyModel($scope,Grade);

      $scope.loadModels(1);
    }
  ]);
