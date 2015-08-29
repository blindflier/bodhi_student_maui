'use strict';

angular.module('bodhiStudentAui')
    .controller('StudentinfoAllTableCtrl', ['$scope', '$timeout', '$state',
        'Student', 'RestHelper', 'AllCities', 'ModelHelper','Grade',
        function($scope, $timeout, $state, Student, RestHelper, AllCities, ModelHelper,Grade) {

            
            $scope.$parent.currentState = $state.current.name;
       
             $scope.$parent.models = [];
            $scope.$parent.loadModels(1);

           
            $scope.$on('ModelLoaded', function(evt, models) {
                angular.forEach(models, function(m) {
                    if (m.birthday)
                        m.birthday = new Date(Date.parse(m.birthday));
                    m.gender = m.gender ? 1 : 0;
                    if (m.grade) {
                        m.city = m.grade.city;
                    }
                });
                $scope.$parent.models = models;
            });
        }
    ]);
