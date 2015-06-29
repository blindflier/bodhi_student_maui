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
            //user model
            $scope.userModel = $scope.$new();
            $scope.userModel.limit = 'all';
            $scope.userModel.$on('ModelLoaded', function(event, models) {
                $scope.userModel.models = models;
                var selected = [];
                models.forEach(function(m){
                    $scope.model.users.forEach(function(u){
                        if (m.id === u.id){
                           m.checked = true;
                           selected.push(m);
                        }
                     });
                });
               $scope.model.users = selected;   
            });
            ModelHelper.loadModels(User, $scope.userModel, true)();

            $scope.reloadUsers = function() {
                $scope.model.users = [];
                $scope.userModel.models.forEach(function(u) {
                    if (u.checked) {
                        $scope.model.users.push(u);
                    }
                });
            };

            $scope.removeUser = function(u){
               u.checked = false;
               $scope.reloadUsers();
            }


        }
    ]);
