'use strict';

angular.module('bodhiStudentAui')
    .controller('RoleAddCtrl', ['$scope', '$timeout', '$state', '$stateParams',
        'RestHelper', 'Role', 'ModelHelper', 'Permission','Student',
        function($scope, $timeout, $state, $stateParams, RestHelper, Role, ModelHelper, Permission,Student) {

            $scope.model = {
                students: [],
                permissions: []
            };
            ModelHelper.initAdd($scope, '修改角色', '增加角色', $stateParams.model, {
                students: [],
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
            $scope.studentModel = {}; //$scope.$new();
            $scope.studentModel.limit = 'all';

            var loadStudents = ModelHelper.loadModels(Student,$scope.studentModel,false);
            $scope.loadStudents = function(){
                if ($scope.studentModel.search.username == '')
                    return;
                loadStudents(1);
            };

            $scope.onSelectStudent = function() {
                if ($scope.studentModel.selectedStudent)
                    $scope.model.students.push($scope.studentModel.selectedStudent);
            };

            $scope.removeStudent = function(u){
               _.remove($scope.model.students,function(s){
                    return s.id == u.id
               });
            }

           

        }
    ]);
