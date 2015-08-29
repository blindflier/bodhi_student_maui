'use strict';

angular.module('bodhiStudentAui')
    .controller('GongxiuAllTableCtrl', ['$scope','$state', 
        'Gongxiu',
        function($scope,$state,Gongxiu) {

         
            
             $scope.$parent.currentState = $state.current.name;
       
             $scope.$parent.models = [];
            $scope.$parent.loadModels(1);

           
            $scope.$on('ModelLoaded', function(evt, models) {
                $scope.$parent.models = models;
            });
        }
    ]);
