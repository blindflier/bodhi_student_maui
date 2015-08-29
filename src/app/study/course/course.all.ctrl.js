'use strict';

angular.module('bodhiStudentAui')
  .controller('CourseAllCtrl', ['$scope', '$timeout', '$state', 
    'Course','RestHelper','ModelHelper','CourseCategories',
    function($scope, $timeout, $state, Course,RestHelper,ModelHelper,CourseCategories) {

      $scope.search = {
        category: '所有'
      };
      $scope.categories = ['所有'].concat(CourseCategories);
      $scope.loadModels = ModelHelper.loadModels(Course,$scope);
      $scope.onUpdate = ModelHelper.updateModel();
      $scope.destroyModel = ModelHelper.destroyModel($scope,Course);

      $scope.loadModels(1);
    }
  ]);
