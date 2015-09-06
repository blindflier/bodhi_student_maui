'use strict';

angular.module('bodhiStudentAui')
    .controller('GongxiuCheckinCtrl', ['$scope', '$timeout', '$state', '$stateParams',
        'RestHelper', 'Gongxiu', 'ModelHelper', 'CourseCategories', 'CurrentUser',
        'Grade', 'CheckinCategories', 'Student','Checkin',
        function($scope, $timeout, $state, $stateParams, RestHelper, Gongxiu,
            ModelHelper, CourseCategories, CurrentUser, Grade, CheckinCategories, Student,Checkin) {


            $scope.returnBack = CurrentUser.isPhone() ? '^.all.list' : '^.all.table';
            if (!$stateParams.model.checkins) {
                //console.log('goto '+$scope.returnBack);
                return $state.go($scope.returnBack);
            }

            $scope.server = {};
            $scope.gongxiu = $stateParams.model;
            $scope.isAdmin = CurrentUser.isStudyAdmin();
            //console.dir($scope.gongxiu);
            $scope.checkinCategories = CheckinCategories;

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
            };
            $scope.loadStudents = function() {
                Student.get({
                    grade_id: $stateParams.model.grade_id,
                    limit: 'all',
                    state: 0,
                    order: 'student_number asc'
                }, function(resp) {
                    $scope.students = resp.data;
                    var clen = $scope.gongxiu.checkins.length;

                    angular.forEach($scope.students, function(s) {
                         s.checkinCategory = '旷课';
                        for(var i=0;i<clen;i++){
                            var checkin = $scope.gongxiu.checkins[i];
                            if (s.id == checkin.student_id){
                                if (checkin.memo){
                                     s.checkinMemo = checkin.memo;
                                     s.showDetail = true;     
                                };
                               
                                s.checkinCategory = checkin.category;
                                break;
                            }
                        } 
                    });
                }, function(err) {
                    console.log(err);
                });
            };
            $scope.loadStudents();

            $scope.submit = function() {
                var data  = {
                    gid : $scope.gongxiu.id,
                    checkins: []
                };
                angular.forEach($scope.students, function(student) {
                    var c = {
                        'student_id': student.id,
                        'category': student.checkinCategory,
                        'memo': student.checkinMemo
                    };
                    data.checkins.push(c);
                });
               RestHelper.restCall({
                    'promise': Checkin.save(data).$promise,
                    'callback': function() {
                       $state.go($scope.returnBack);
                    },
                    'server': $scope.server
                });
            };

        }
    ]);
