'use strict';

angular.module('bodhiStudentAui')
    .controller('SidebarCtrl', ['$scope', '$http', '$state',
        '$rootScope', 'SharedState','CurrentUser',
        function($scope, $http, $state, $rootScope, SharedState,CurrentUser) {
            $scope.ss = SharedState;
            $scope.isPhone = CurrentUser.isPhone();
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

            var menuInfo = {
                text: '基本信息',
                icon: 'fa-info',
                state: 'info',
                permissions: ['SYSTEM_ADMIN'],
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
                            state:  $scope.isPhone?  'info.student.all.list' : 'info.student.all.table'
                        }, {
                            text: '增加学员',
                            icon: 'fa-plus-circle',
                            state: 'info.student.add'
                        }

                    ]
                }]
            };
            var menuStudy = {
                text: '修学管理',
                icon: 'fa-graduation-cap',
                state: 'study',
                permissions: [],
                children: [{
                    text: '课程管理',
                    icon: 'fa-book',
                    state: 'study.course',
                    permissions: ['SYSTEM_ADMIN','STUDY_ADMIN'],
                    children: [{
                        text: '所有课程',
                        icon: 'fa-search',
                        state: 'study.course.all'
                    }, {
                        text: '增加课程',
                        icon: 'fa-plus-circle',
                        state: 'study.course.add'
                    }]
                },{
                    text: '班级共修',
                    icon: 'fa-calendar',
                    state: 'study.gongxiu',
                    permissions: ['SYSTEM_ADMIN','STUDY_ADMIN','STUDY_GONGXIU_ADMIN'],
                    children: [{
                        text: '所有共修',
                        icon: 'fa-search',
                        state:  $scope.isPhone? 'study.gongxiu.all.list' : 'study.gongxiu.all.table',
                        permissions: ['STUDY_GONGXIU_ADMIN_MY']
                    }, {
                        text: '增加共修',
                        icon: 'fa-plus-circle',
                        state: 'study.gongxiu.add',
                        permissions: ['STUDY_GONGXIU_ADMIN_MY']
                    }]
                }]
            };
            var menuSystem = {
                text: '系统管理',
                icon: 'fa-gears',
                state: 'system',
                permissions: ['SUPER_ADMIN'],
                children: [{
                    text: '用户管理',
                    icon: 'fa-user',
                    state: 'system.user',
                    permissions: ['SYSTEM_ADMIN'],
                    children: [{
                        text: '所有用户',
                        icon: 'fa-search',
                        state: 'system.user.all'
                    }, {
                        text: '增加用户',
                        icon: 'fa-plus-circle',
                        state: 'system.user.add'
                    }]
                }, {
                    text: '角色管理',
                    icon: 'fa-group',
                    state: 'system.role',
                    permissions: ['SYSTEM_ADMIN'],
                    children: [{
                        text: '所有角色',
                        icon: 'fa-search',
                        state: 'system.role.all'
                    }, {
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
                    }, {
                        text: '增加权限',
                        icon: 'fa-plus-circle',
                        state: 'system.permission.add'
                    }]
                }]
            };

            var iPermissions = CurrentUser.permissions();
            var superadmin = isSuperAdmin(iPermissions);

            var menu = filterMenu([menuInfo, menuStudy, menuSystem], []);
            $scope.menu = [];
            angular.forEach(menu, function(item) {
                if (item.visible) {
                    $scope.menu.push(item);
                }
            });
            //console.dir($scope.menu); 
            function filterMenu(menu, permissions) {

                var children;
                var visible;

                //console.log();
                angular.forEach(menu, function(item) {

                    item.permissions = permissions.concat(item.permissions || []);

                    if (item.children) {

                        filterMenu(item.children, item.permissions);

                        children = [];
                        angular.forEach(item.children, function(childItem) {
                            if (childItem.visible)
                                children.push(childItem);
                        });

                        item.children = children;
                        item.visible = children.length > 0;

                    } else {
                        item.visible = superadmin || havePermission(iPermissions, item.permissions);
                    }

                });

                return menu;
            };

            function isSuperAdmin(permissions) {
                for (var i = 0; i < permissions.length; i++)
                    if (permissions[i] === 'SUPER_ADMIN')
                        return true;
                return false;
            };

            function havePermission(i_have, y_need) {
                i_have = i_have || [];
                y_need = y_need || [];
                var iLen = i_have.length;
                var yLen = y_need.length;
                if (yLen == 0)
                    return true;
                for (var i = 0; i < iLen; i++)
                    for (var j = 0; j < yLen; j++)
                        if (i_have[i] == y_need[j])
                            return true;
                return false;
            };

        }
    ]);
