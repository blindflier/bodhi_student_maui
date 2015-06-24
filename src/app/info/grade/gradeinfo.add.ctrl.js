'use strict';

angular.module('bodhiStudentAui')
    .controller('GradeinfoAddCtrl', ['$scope', '$timeout', '$state', '$stateParams',
        'RestHelper', 'Grade', 'Cities', 'GradeTypes', 'ModelHelper',
        function($scope, $timeout, $state, $stateParams, RestHelper, Grade, Cities, GradeTypes, ModelHelper) {

            $scope.cities = Cities;
            $scope.types = GradeTypes;
            $scope.idPattern = /^[A-Z]{3}\-[A-Z]\d{4}$/;
            $scope.model = {};

            var data = {
                city: $scope.model.city || '南京',
                code: 'NAJ-',
                genre: '同喜'
            };
           
            ModelHelper.initAdd($scope, '修改班级', '增加班级', $stateParams.model,data);
            $scope.submit = ModelHelper.submitModel(Grade,$scope,data);


        }
    ]);
