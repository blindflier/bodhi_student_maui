'use strict';

angular.module('bodhiStudentAui')
    .controller('StudentinfoAllCtrl', ['$scope', '$timeout', '$state',
        'Student', 'RestHelper', 'AllCities', 'ModelHelper', 'Grade',
        'States','$stateParams',
        function($scope, $timeout, $state, Student, RestHelper, 
            AllCities, ModelHelper, Grade,States,$stateParams) {

            $scope.cities = AllCities;
            $scope.states = [{lbl:'所有',val:-1}].concat(States);
            $scope.limit = 15;
            //console.log($state.current.name);
            $scope.search = {
                'city': $scope.cities[0],
                'state': -1
            };
            if ($stateParams.grade){
                $scope.search.city = $stateParams.grade.city;
                $scope.search.grade_id = $stateParams.grade.id;

            };
            $scope.grades = [];
            $scope.models = [];
            
            $scope.loadModels = ModelHelper.loadModels(Student, $scope, true);
            $scope.onUpdate = ModelHelper.updateModel('info.student');
            $scope.destroyModel = ModelHelper.destroyModel($scope, Student);
           
            
            $scope.onSearchCity = function() {
                $scope.models = [];
                $scope.currentPage = 1;
                $scope.loadGrades();
                $scope.loadModels();
            };
            $scope.onSearch = function() {
                $scope.models = [];
                $scope.currentPage = 1;
                $scope.loadModels();
            };


            $scope.loadGrades = function() {
                $scope.grades = [];
                delete $scope.search.grade_id;

                if (!$scope.search.city || $scope.search.city == '所有')
                    return;

                Grade.get({
                    city: $scope.search.city,
                    limit: 'all',
                    order: 'seq asc'
                }, function(resp) {
                    $scope.grades = [{
                        genre: '所有',
                        seq: '',
                        id: 0
                    }].concat(resp.data);
                    //console.log(resp.data);
                    $scope.search.grade_id = 0;

                }, function(err) {
                    console.log(err);
                });
            };

           
        }
    ]);
