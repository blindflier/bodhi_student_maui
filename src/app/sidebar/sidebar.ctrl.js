'use strict';

angular.module('bodhiStudentAui')
    .controller('SidebarCtrl', ['$scope', '$http', '$state',
        'StorageService', 'SharedState',
        function($scope, $http, $state, StorageService, SharedState) {

            $scope.ss = SharedState;
            var isState = $scope.isState = function(s) {
                return $state.is(s);
            };
            $scope.hasSubMenu = function(m) {
                return !!(m.children && m.children.length > 0);
            };

            $scope.toggleMenuAccordion = function(state) {
                $scope.menuAccordion =
                    $scope.menuAccordion == state ? '' : state;
            };

            var menu_info = {
                text: '基本信息',
                icon: 'fa-info',
                state: 'info',
                children: [{
                    text: '班级基本信息',
                    icon: 'fa-university',
                    state: 'gradeinfo',
                    children: [{
                            text: '所有班级',
                            icon: 'fa-search',
                            state: 'info.grade.all'
                        }, {
                            text: '增加班级',
                            icon: 'fa-plus-circle',
                            state: 'info.grade.add'
                        }

                    ]
                }, {
                    text: '学员基本信息',
                    icon: 'fa-user',
                    state: 'gradeinfo.add',
                    children: [{
                            text: '所有学员',
                            icon: 'fa-search',
                            state: 'info.student.all.list'
                        }, {
                            text: '增加学员',
                            icon: 'fa-plus-circle',
                            state: 'info.student.add'
                        }

                    ]
                }]
            };
            var menu_system = {
                text: '系统管理',
                icon: 'fa-gears',
                state: 'system',
                children: [{
                    text: '用户管理',
                    icon: 'fa-user',
                    state: 'system.user',
                     children: [{
                        text: '所有用户',
                        icon: 'fa-search',
                        state: 'system.user.all'
                    },{
                        text: '增加用户',
                        icon: 'fa-plus-circle',
                        state: 'system.user.add'
                    }]
                },{
                    text: '角色管理',
                    icon: 'fa-group',
                    state: 'system.role',
                     children: [{
                        text: '所有角色',
                        icon: 'fa-search',
                        state: 'system.role.all'
                    },{
                        text: '增加角色',
                        icon: 'fa-plus-circle',
                        state: 'system.role.add'
                    }]
                }, {
                    text: '权限管理',
                    icon: 'fa-key',
                    state: 'system.permission',
                    children: [{
                        text: '所有权限',
                        icon: 'fa-search',
                        state: 'system.permission.all'
                    },{
                        text: '增加权限',
                        icon: 'fa-plus-circle',
                        state: 'system.permission.add'
                    }]
                }]
            };
            $scope.allMenu = [menu_info, menu_system];

            $scope.menu = $scope.allMenu;


        }
    ]);
