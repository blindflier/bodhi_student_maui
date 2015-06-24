'use strict';

angular.module('bodhiStudentAui')
    .controller('StudentinfoAddCtrl', ['$scope', '$timeout', '$state', '$stateParams',
        'RestHelper', 'Student', 'Cities', 'ModelHelper', 'Grade', 'Genders', 'Educations', 'States',
        function($scope, $timeout, $state, $stateParams, RestHelper, Student,
            Cities, ModelHelper, Grade, Genders, Educations, States) {

            $scope.cities = Cities;
            $scope.genders = Genders;
            $scope.states = States;
            $scope.educations = Educations;
            $scope.grades = [];
            $scope.idPattern = /^\d{16}$/;
            $scope.model = {
                city: '南京'
            };
       
            $scope.returnBack = $stateParams.returnBack || '^.all.table';
            //console.log($scope.returnBack);
            var data = {
                gender: 0,
                education: '本科',
                state: 0
            };

            ModelHelper.initAdd($scope, '修改学员信息', '增加学员', $stateParams.model, data,$scope.returnBack);
            $scope.submit = ModelHelper.submitModel(Student, $scope, data,$scope.returnBack);

            $scope.$on('afterSave',function(evt,d){
                 $scope.model.city =  d.city;
                 $scope.model.grade_id = d.grade_id;
            });

            $scope.loadGrades = function() {
                Grade.get({
                    city: $scope.model.city,
                    limit: 'all',
                    order: 'seq asc'
                }, function(resp) {
                    $scope.grades = resp.data;
                    //console.log(resp.data);
                    if ($scope.grades.length > 0) {
                        var found = false;
                        angular.forEach($scope.grades, function(grade) {
                            if ($scope.model.grade_id && $scope.model.grade_id == grade.id)
                                found = true;
                        });
                        if (!found)
                            $scope.model.grade_id = $scope.grades[0].id;
                    }
                }, function(err) {
                    console.log(err);
                });
            };
            $scope.loadGrades();
        }
    ]);
