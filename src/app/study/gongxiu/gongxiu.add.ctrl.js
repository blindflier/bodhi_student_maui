'use strict';

angular.module('bodhiStudentAui')
    .controller('GongxiuAddCtrl', ['$scope', '$timeout', '$state', '$stateParams',
        'RestHelper', 'Gongxiu', 'ModelHelper','CourseCategories','CurrentUser',
        'Grade','Cities','Course',
        function($scope, $timeout, $state, $stateParams, RestHelper, Gongxiu,
         ModelHelper,CourseCategories,CurrentUser,Grade,Cities,Course) {
            

            $scope.categories = CourseCategories;
            $scope.cities = Cities;

            $scope.currentGrade = CurrentUser.grade() || {};

            $scope.model = {
                city: $scope.currentGrade.city || '南京',
                holding_time: new Date()
            };
            angular.forEach($scope.categories, function(cat){
              if ($scope.currentGrade.genre && -1 !== cat.indexOf($scope.currentGrade.genre)){
                $scope.model.category = cat;
              }
            });
            $scope.dtpOptions = {
                locale: 'zh-cn',
                icons: {
                    time: 'fa fa-clock-o',
                    date: 'fa fa-calendar',
                    up: 'fa fa-arrow-up',
                    down: 'fa fa-arrow-down'
                },
                sideBySide: true,
                format: 'YYYY/MM/DD HH:mm'
            };
           
            $scope.inGradeJail = !CurrentUser.isStudyAdmin();

            if($stateParams.model && $stateParams.model.holding_time){
              $stateParams.model.holding_time = new Date($stateParams.model.holding_time);         
            }
            $scope.returnBack = CurrentUser.isPhone() ? '^.all.list' : '^.all.table';
           
            var data = {};
            ModelHelper.initAdd($scope, '修改共修', '增加共修', $stateParams.model,data,$scope.returnBack);
            $scope.submit = ModelHelper.submitModel(Gongxiu, $scope,data,$scope.returnBack);

           
            $scope.$on('afterSave',function(evt,d){
                 $scope.model.city =  d.city;
                 $scope.model.grade_id = d.grade_id;
                 $scope.model.category = d.category;
                 $scope.model.course_id = d.course_id;
 
                 var prev = new Date(d.holding_time);
                 var next = new Date(d.holding_time);
                 next.setDate(prev.getDate()+7);
                 $scope.model.holding_time =next;
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

            $scope.loadCourses = function(){
              Course.get({
                    category: $scope.model.category,
                    limit: 'all',
                    order: 'seq asc'
                }, function(resp) {
                    $scope.courses = resp.data;
                    //console.log(resp.data);
                    if ($scope.courses.length > 0) {
                        var found = false;
                        angular.forEach($scope.courses, function(course) {
                            if ($scope.model.course_id && $scope.model.course_id == course.id)
                                found = true;
                        });
                        if (!found)
                            $scope.model.course_id = $scope.courses[0].id;
                    }
                }, function(err) {
                    console.log(err);
                });
            };
            $scope.loadCourses();
        }
    ]);
