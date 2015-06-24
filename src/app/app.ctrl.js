'use strict';

angular.module('bodhiStudentAui')
  .controller('AppCtrl', ['$scope', '$state','StorageService',
    function($scope,$state,StorageService) {
       $scope.isLoginState = function(){
         return $state.is('login');
       };

        $scope.logout = function(){
          StorageService.remove('user');
          $state.go('login');
        }

       $scope.user = StorageService.get('user');
    }
  ]);