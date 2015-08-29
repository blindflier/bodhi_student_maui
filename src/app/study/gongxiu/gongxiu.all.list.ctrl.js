'use strict';

angular.module('bodhiStudentAui')
    .controller('GongxiuAllListCtrl', ['$scope','$state', 
        'Gongxiu',
        function($scope,$state,Gongxiu) {

            $scope.$parent.models = [];
            $scope.$parent.loadModels(1);
  
            $scope.$parent.currentState = $state.current.name;
             $scope.loadNextPage = function() {
                if ($scope.currentPage < $scope.pages) {
                    $scope.loadModels(1 + $scope.currentPage);
                }
            };

            $scope.$on('ModelLoaded', function(evt, models) {
                // angular.forEach(models, function(m) {
                //     m.holding_time = new Date(Date.parse(m.holding_time));
                // });
                $scope.$parent.models = $scope.$parent.models.concat(models);
            });

            $scope.reloadModels = function(){
                console.log('reloadModels');
               $scope.$parent.models = [];
               $scope.$parent.loadModels(1);
            }
        }
    ]);
