'use strict';

angular.module('bodhiStudentAui')
  .controller('LoginCtrl', ['$scope', '$http', '$state',
    'CurrentUser','$rootScope',
    function($scope,$http,$state,CurrentUser,$rootScope) {
        $scope.data = {};

        $scope.login = function(){
           if ($scope.loginform.$invalid)
            return;
            
            $http.get('/api/token',{params:$scope.data})
            .success(function(data, status, headers, config){
              if (data.success){
                CurrentUser.login(data)
                return $state.go('home');
              }else{
                alert(data.error);
              }
            })
            .error(function(data, status, headers, config){
                alert(data);
            });

        }
    }
  ]);
