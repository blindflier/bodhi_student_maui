'use strict';

angular.module('bodhiStudentAui')
    .controller('PermissionAddCtrl', ['$scope', '$timeout', '$state', '$stateParams',
        'RestHelper', 'Permission', 'ModelHelper',
        function($scope, $timeout, $state, $stateParams, RestHelper, Permission, ModelHelper) {


            $scope.codePattern = /^[A-Z_]{4,}$/;

            ModelHelper.initAdd($scope,'修改权限','增加权限',$stateParams.model);
            $scope.submit = ModelHelper.submitModel(Permission, $scope);

        }
    ]);
