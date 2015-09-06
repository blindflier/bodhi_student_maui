'use strict';

angular.module('bodhiStudentAui', ['ngAnimate', 'ngCookies', 'ngTouch', 'ngSanitize',
        'ngResource', 'ui.router', 'mobile-angular-ui', 'ng-bootstrap-datetimepicker'
    ])
    .config(['$stateProvider', '$urlRouterProvider',
        '$httpProvider',

        function($stateProvider, $urlRouterProvider, $httpProvider) {

            $urlRouterProvider.otherwise('/home');

            $httpProvider.interceptors.push('TokenInceptor');

            $stateProvider
                .state('login', {
                    url: '/login',
                    templateUrl: 'app/login/login.html',
                    controller: 'LoginCtrl'
                })
                .state('home', {
                    url: '/home',
                    templateUrl: 'app/home/home.html',
                    controller: 'HomeCtrl'
                });

            system();
            study();
            info();

            function system() {
                $stateProvider.state('system', {
                    abstract: true,
                    url: '/system',
                    template: '<ui-view/>'
                });
                system_user();
                system_role();
                system_permission();
            }

            function system_user() {
                $stateProvider.state('system.user', {
                        abstract: true,
                        url: '/user',
                        template: '<ui-view/>'
                    })
                    .state('system.user.all', {
                        url: '/all',
                        templateUrl: 'app/system/user/_all.html',
                        controller: 'UserAllCtrl'
                    })
                    .state('system.user.add', {
                        url: '/add',
                        templateUrl: 'app/system/user/_add.html',
                        controller: 'UserAddCtrl'
                    })
                    .state('system.user.update', {
                        url: '/update',
                        templateUrl: 'app/system/user/_add.html',
                        controller: 'UserAddCtrl',
                        params: {
                            model: {}
                        }
                    })
            }

            function system_permission() {
                $stateProvider.state('system.permission', {
                        abstract: true,
                        url: '/permission',
                        template: '<ui-view/>'
                    })
                    .state('system.permission.all', {
                        url: '/all',
                        templateUrl: 'app/system/permission/_all.html',
                        controller: 'PermissionAllCtrl'
                    })
                    .state('system.permission.add', {
                        url: '/add',
                        templateUrl: 'app/system/permission/_add.html',
                        controller: 'PermissionAddCtrl'
                    })
                    .state('system.permission.update', {
                        url: '/update',
                        templateUrl: 'app/system/permission/_add.html',
                        controller: 'PermissionAddCtrl',
                        params: {
                            model: {}
                        }
                    });
            }

            function system_role() {
                $stateProvider.state('system.role', {
                        abstract: true,
                        url: '/role',
                        template: '<ui-view/>'
                    })
                    .state('system.role.all', {
                        url: '/all',
                        templateUrl: 'app/system/role/_all.html',
                        controller: 'RoleAllCtrl'
                    })
                    .state('system.role.add', {
                        url: '/add',
                        templateUrl: 'app/system/role/_add.html',
                        controller: 'RoleAddCtrl'
                    })
                    .state('system.role.update', {
                        url: '/update',
                        templateUrl: 'app/system/role/_add.html',
                        controller: 'RoleAddCtrl',
                        params: {
                            model: {}
                        }
                    })
            }

            function study() {
                $stateProvider.state('study', {
                    abstract: true,
                    url: '/study',
                    template: '<ui-view/>'
                });
                study_course();
                study_gongxiu();
            }

            function study_course() {
                //课程管理
                $stateProvider.state('study.course', {
                        abstract: true,
                        url: '/course',
                        template: '<ui-view/>'
                    })
                    .state('study.course.all', {
                        url: '/all',
                        templateUrl: 'app/study/course/_all.html',
                        controller: 'CourseAllCtrl'
                    })
                    .state('study.course.add', {
                        url: '/add',
                        templateUrl: 'app/study/course/_add.html',
                        controller: 'CourseAddCtrl'
                    })
                    .state('study.course.update', {
                        url: '/update',
                        templateUrl: 'app/study/course/_add.html',
                        controller: 'CourseAddCtrl',
                        params: {
                            model: {}
                        }
                    });
            }

            function study_gongxiu() {
                //班级管理
                $stateProvider.state('study.gongxiu', {
                        abstract: true,
                        url: '/gongxiu',
                        template: '<ui-view/>'
                    })
                    .state('study.gongxiu.all', {
                        url: '/all',
                        templateUrl: 'app/study/gongxiu/_all.html',
                        controller: 'GongxiuAllCtrl'
                    })
                    .state('study.gongxiu.all.list', {
                        url: '/list',
                        templateUrl: 'app/study/gongxiu/_all.list.html',
                        controller: 'GongxiuAllListCtrl'
                    })
                    .state('study.gongxiu.all.table', {
                        url: '/table',
                        templateUrl: 'app/study/gongxiu/_all.table.html',
                        controller: 'GongxiuAllTableCtrl'
                    })

                .state('study.gongxiu.add', {
                        url: '/add',
                        templateUrl: 'app/study/gongxiu/_add.html',
                        controller: 'GongxiuAddCtrl'
                    })
                    .state('study.gongxiu.update', {
                        url: '/update',
                        templateUrl: 'app/study/gongxiu/_add.html',
                        controller: 'GongxiuAddCtrl',
                        params: {
                            model: {}
                        }
                    })
                    .state('study.gongxiu.checkin', {
                        url: '/checkin',
                        templateUrl: 'app/study/gongxiu/_checkin.html',
                        controller: 'GongxiuCheckinCtrl',
                        params: {
                            model: {}
                        }
                    });
            };

            function info() {
                $stateProvider.state('info', {
                    abstract: true,
                    url: '/info',
                    template: '<ui-view/>'
                });

                info_grade();
                info_student();
            }

            function info_grade() {
                //班级管理
                $stateProvider.state('info.grade', {
                        abstract: true,
                        url: '/grade',
                        template: '<ui-view/>'
                    })
                    .state('info.grade.all', {
                        url: '/all',
                        templateUrl: 'app/info/grade/_all.html',
                        controller: 'GradeinfoAllCtrl'
                    })
                    .state('info.grade.add', {
                        url: '/add',
                        templateUrl: 'app/info/grade/_add.html',
                        controller: 'GradeinfoAddCtrl'
                    })
                    .state('info.grade.update', {
                        url: '/update',
                        templateUrl: 'app/info/grade/_add.html',
                        controller: 'GradeinfoAddCtrl',
                        params: {
                            model: {}
                        }
                    });
            };

            function info_student() {
                //学员管理
                $stateProvider.state('info.student', {
                        abstract: true,
                        url: '/student',
                        template: '<ui-view/>'
                    })
                    .state('info.student.all', {
                        url: '/all',
                        templateUrl: 'app/info/student/_all.html',
                        controller: 'StudentinfoAllCtrl'
                    })
                    .state('info.student.all.table', {
                        url: '/table',
                        templateUrl: 'app/info/student/_all.table.html',
                        controller: 'StudentinfoAllTableCtrl'
                    })
                    .state('info.student.all.list', {
                        url: '/list',
                        templateUrl: 'app/info/student/_all.list.html',
                        controller: 'StudentinfoAllListCtrl'
                    })
                    .state('info.student.add', {
                        url: '/add',
                        templateUrl: 'app/info/student/_add.html',
                        controller: 'StudentinfoAddCtrl',
                        params: {
                            returnBack: false
                        }
                    })
                    .state('info.student.update', {
                        url: '/update',
                        templateUrl: 'app/info/student/_add.html',
                        controller: 'StudentinfoAddCtrl',
                        params: {
                            model: {}
                        }
                    });
            }

        }
    ])

.run(['$rootScope', '$location', 'CurrentUser', '$state', '$urlRouter',
    function($rootScope, $location, CurrentUser, $state, $urlRouter) {
        $rootScope.$on('$stateChangeStart', function(event, toState) {

            var tokenExpired = CurrentUser.tokenExpired();
            if (tokenExpired && toState.name !== 'login') {
                event.preventDefault();
                $urlRouter.update(true);
                $state.transitionTo('login');
            }
            if (toState.name === 'login' && !tokenExpired) {
                event.preventDefault();
                $urlRouter.update(true);
                $state.go('home');
            }
        });


        $rootScope.onEnter = function(ev, callback) {
            if (ev.keyCode !== 13) return;
            var params = Array.prototype.slice.call(arguments, 2);
            callback.apply(null, params);
        }


        $rootScope.isState = function(s) {
            return $state.is(s);
        };



    }
])
