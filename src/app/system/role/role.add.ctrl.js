'use strict';

angular.module('bodhiStudentAui')
    .controller('RoleAddCtrl', ['$scope', '$timeout', '$state', '$stateParams',
        'RestHelper', 'Role','ModelHelper',
        function($scope, $timeout, $state, $stateParams, RestHelper, Role,ModelHelper) {

            $scope.model = {};
            $scope.model.users = [];
            $scope.model.permissions = [];
            for (var i = 1; i < 20; i++) {
                $scope.model.users.push({
                    username: 'a' + i
                });
            }

            ModelHelper.initAdd($scope, '修改角色', '增加角色', $stateParams.model);
            $scope.submit = ModelHelper.submitModel(Role, $scope);






        }
    ]);
