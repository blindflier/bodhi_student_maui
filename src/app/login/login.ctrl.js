'use strict';

angular.module('bodhiStudentAui')
  .controller('LoginCtrl', ['$scope', '$http', '$state',
    'StorageService',
    function($scope,$http,$state,StorageService) {
        $scope.data = {};

        $scope.login = function(){
           if ($scope.loginform.$invalid)
            return;
            
            $http.post('/api/login',$scope.data)
            .success(function(data, status, headers, config){
              if (data.success){
                StorageService.put('user',data.user);
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
