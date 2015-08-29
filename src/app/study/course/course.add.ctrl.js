'use strict';

angular.module('bodhiStudentAui')
    .controller('CourseAddCtrl', ['$scope', '$timeout', '$state', '$stateParams',
        'RestHelper', 'Course', 'ModelHelper','CourseCategories',
        function($scope, $timeout, $state, $stateParams, RestHelper, Course, ModelHelper,CourseCategories) {

            $scope.categories = CourseCategories;
            var data = {
                category: '同喜班'
            };

            ModelHelper.initAdd($scope,'修改课程','增加课程',$stateParams.model,data);
            $scope.submit = ModelHelper.submitModel(Course, $scope);

        }
    ]);
