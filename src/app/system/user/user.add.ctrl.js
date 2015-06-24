'use strict';

angular.module('bodhiStudentAui')
    .controller('UserAddCtrl', ['$scope', '$timeout', '$state', '$stateParams',
        'User', 'ModelHelper','Student',
        function($scope, $timeout, $state, $stateParams, User, ModelHelper,Student) {


            $scope.codePattern = /^[A-Z_]{4,}$/;
            $scope.searchModel = {
                limit: 'all',
                models: []
            };
            //console.log($stateParams.model);
            ModelHelper.initAdd($scope, '修改用户', '增加用户', $stateParams.model);
            $scope.submit = ModelHelper.submitModel(User, $scope);

            $scope.matchPassword = function() {
                var match;
                $scope.model.password = $scope.model.password || '';
                $scope.model.password1 = $scope.model.password1 || '';

                if ($state.is('^.update')) {
                    match = $scope.model.password == $scope.model.password1 &&
                        ($scope.model.password.length == 0 ||
                            $scope.model.password.length >= 6);
                } else {
                    match = $scope.model.password.length >= 6 &&
                        $scope.model.password == $scope.model.password1;
                }
                $scope.userform.password.$setValidity('match', match);
                $scope.userform.password1.$setValidity('match', match);


                $scope.userform.$setValidity('match', !$scope.userform.username.$invalid && match);
                //console.log(match);
                return match;
            };

            $scope.loadStudents = ModelHelper.loadModels(Student,$scope.searchModel);
            $scope.clearBindStudent = function(){
                delete $scope.model.student_id;
                delete $scope.model.student;
            } 

            $scope.onBindStudent = function() {
                $scope.model.student = $scope.searchModel.student || $scope.model.student;
                if ($scope.model.student)
                    $scope.model.student_id = $scope.model.student.id;
                else
                    delete $scope.model.student_id;
            };

        }
    ]);
