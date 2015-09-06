'use strict';

angular.module('bodhiStudentAui')
    .controller('StudentinfoAddCtrl', ['$scope', '$timeout', '$state', '$stateParams',
        'RestHelper', 'Student', 'Cities', 'ModelHelper', 'Grade', 'Genders', 'Educations', 'States',
        'CurrentUser',
        function($scope, $timeout, $state, $stateParams, RestHelper, Student,
            Cities, ModelHelper, Grade, Genders, Educations, States, CurrentUser) {
            $scope.isPhone = CurrentUser.isPhone();
            $scope.cities = Cities;
            $scope.genders = Genders;
            $scope.states = States;
            $scope.educations = Educations;
            $scope.grades = [];
            $scope.model = {
                city: '南京'
            };

            $scope.returnBack = $stateParams.returnBack || ($scope.isPhone ? '^.all.list' : '^.all.table');
            //console.log($scope.returnBack);
            var data = {
                gender: 0,
                education: '本科',
                state: 0
            };

            ModelHelper.initAdd($scope, '修改学员信息', '增加学员', $stateParams.model, data, $scope.returnBack);
            $scope.submit = ModelHelper.submitModel(Student, $scope, data, $scope.returnBack);

            $scope.$on('afterSave', function(evt, d) {
                $scope.model.city = d.city;
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

            $scope.changeName = function() {
                if (!$scope.model.bud_name) {
                    $scope.model.username = $scope.model.name;
                }
            };
            $scope.changeBudName = function() {
                $scope.model.username = $scope.model.bud_name;
            };
            $scope.changeStudentNumber = function() {
                $scope.model.password = $scope.model.student_number;
                $scope.onChangePassword();
            };
            $scope.onChangePassword = function() {
                var l = $scope.model.password.length;
                //console.log('onChangePassword ' + l);
                if ($state.is('^.add')) {
                    $scope.studentform.password.$setValidity('length', l >= 6);
                }
                if ($state.is('^.update')) {
                    $scope.studentform.password.$setValidity('length', (l == 0 || l >= 6));
                }
            };
        }
    ]);
