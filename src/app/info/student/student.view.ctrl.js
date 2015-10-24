'use strict';

angular.module('bodhiStudentAui')
    .controller('StudentinfoViewCtrl', ['$scope','$state','$stateParams','Student',
      function($scope,$state,$stateParams,Student){
        if ($stateParams.student)
          $scope.model =  $stateParams.model;
        else
          if ($stateParams.studentId)
              Student.get({id:$stateParams.studentId},function(resp){
                $scope.model = resp.data;
              });
          else
              return $state.go('error');
      }]);