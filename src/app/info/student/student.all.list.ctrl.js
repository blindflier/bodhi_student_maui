'use strict';

angular.module('bodhiStudentAui')
    .controller('StudentinfoAllListCtrl', ['$scope', '$timeout', '$state',
        'Student', 'RestHelper', 'AllCities', 'ModelHelper','Grade',
        function($scope, $timeout, $state, Student, RestHelper, AllCities, ModelHelper,Grade) {

         
            
            $scope.$parent.models = [];
            $scope.$parent.loadModels(1);
            $scope.$parent.currentState = $state.current.name;
             $scope.loadNextPage = function() {
                if ($scope.currentPage < $scope.pages) {
                    $scope.loadModels(1 + $scope.currentPage);
                }
            };

            $scope.$on('ModelLoaded', function(evt, models) {
                angular.forEach(models, function(m) {
                    if (m.birthday)
                        m.birthday = new Date(Date.parse(m.birthday));
                    m.gender = m.gender ? 1 : 0;
                    if (m.grade) {
                        m.city = m.grade.city;
                    }
                });
                $scope.$parent.models = $scope.$parent.models.concat(models);
            });

            $scope.reloadModels = function(){
                console.log('reloadModels');
               $scope.$parent.models = [];
               $scope.$parent.loadModels(1);
            }
        }
    ]);
