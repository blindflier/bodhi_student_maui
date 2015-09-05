'use strict';

angular.module('bodhiStudentAui')
    .controller('RoleAddCtrl', ['$scope', '$timeout', '$state', '$stateParams',
        'RestHelper', 'Role', 'ModelHelper', 'Permission','User',
        function($scope, $timeout, $state, $stateParams, RestHelper, Role, ModelHelper, Permission,User) {

            ModelHelper.initAdd($scope, '修改角色', '增加角色', $stateParams.model, {
                users: [],
                permissions: []
            });
            $scope.submit = ModelHelper.submitModel(Role, $scope);

            //permission model
            $scope.permissionModel = $scope.$new();
            $scope.permissionModel.limit = 'all';
            $scope.permissionModel.$on('ModelLoaded', function(event, models) {
                $scope.permissionModel.models = models;
                var selected = [];
                models.forEach(function(m){
                    $scope.model.permissions.forEach(function(p){
                        if (m.id === p.id){
                           m.checked = true;
                           selected.push(m);
                        }
                     });
                });
               $scope.model.permissions = selected;   
            });
            ModelHelper.loadModels(Permission, $scope.permissionModel, true)();
  

            $scope.reloadPermissions = function() {
                $scope.model.permissions = [];
                $scope.permissionModel.models.forEach(function(p) {
                    if (p.checked) {
                        $scope.model.permissions.push(p);
                    }
                });
            };

            $scope.removePermission = function(p){
               p.checked = false;
               $scope.reloadPermissions();
            }
            //student model
            $scope.studentModel = $scope.$new();
            $scope.studentModel.limit = 'all';
            $scope.studentModel.$on('ModelLoaded', function(event, models) {
                $scope.studentModel.models = models;
                var selected = [];
                models.forEach(function(m){
                    $scope.model.students.forEach(function(u){
                        if (m.id === u.id){
                           m.checked = true;
                           selected.push(m);
                        }
                     });
                });
               $scope.model.students = selected;   
            });
            ModelHelper.loadModels(Student, $scope.studentModel, true)();

            $scope.reloadStudents = function() {
                $scope.model.students = [];
                $scope.studentModel.models.forEach(function(u) {
                    if (u.checked) {
                        $scope.model.students.push(u);
                    }
                });
            };

            $scope.removeStudent = function(u){
               u.checked = false;
               $scope.reloadStudents();
            }


        }
    ]);
