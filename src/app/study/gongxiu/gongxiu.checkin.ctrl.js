'use strict';

angular.module('bodhiStudentAui')
    .controller('GongxiuCheckinCtrl', ['$scope', '$timeout', '$state', '$stateParams',
        'RestHelper', 'Gongxiu', 'ModelHelper', 'CourseCategories', 'CurrentUser',
        'Grade', 'CheckinCategories', 'Student',
        function($scope, $timeout, $state, $stateParams, RestHelper, Gongxiu,
            ModelHelper, CourseCategories, CurrentUser, Grade, CheckinCategories, Student) {


            $scope.returnBack = CurrentUser.isPhone() ? '^.all.list' : '^.all.table';
            if (!$stateParams.model.grade_id) {
                console.log('goto '+$scope.returnBack);
                return $state.go($scope.returnBack);
            }
            

            $scope.gongxiu = $stateParams.model;
            $scope.isAdmin = CurrentUser.isStudyGongxiuAdmin();
            //console.dir($scope.gongxiu);
            $scope.checkinCategories = CheckinCategories;


            $scope.model = {};



            $scope.setCheckinCategory = function(c, cc) {
                c.checkinCategory = cc;
            };
            $scope.getCheckinClass = function(c, cc) {
                if (c.checkinCategory == cc) {
                    switch (cc) {
                        case '现场':
                            return {
                                'btn-success': true
                            };
                        case '网络':
                        case '公差':
                        case '补课':
                            return {
                                'btn-primary': true
                            };
                        case '心得':
                            return {
                                'btn-warning': true
                            };
                        case '旷课':
                            return {
                                'btn-danger': true
                            };
                        default:
                            return {
                                'btn-primary': true
                            };
                    }

                } else {
                    return {};
                }
            }
            $scope.loadStudents = function() {
                Student.get({
                    grade_id: $stateParams.model.grade_id,
                    limit: 'all',
                    state: 0,
                    order: 'student_id asc'
                }, function(resp) {
                    $scope.students = resp.data;
                    angular.forEach($scope.students, function(s) {
                        s.checkinCategory = '旷课';
                    });
                }, function(err) {
                    console.log(err);
                });
            };
            $scope.loadStudents();


            $scope.submit = function(){
                var data = {};
                data.gongxiu_id = $scope.gongxiu.id;
                data.checkin = [];
                angular.forEach($scope.students, function(student){
                    var c = {
                        'student_id' : student.id,
                        'category' : student.checkinCategory,
                        'memo': student.checkinMemo
                    };
                    data.checkin.push(c);
                });
                
            };

        }
    ]);
