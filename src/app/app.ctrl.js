'use strict';

angular.module('bodhiStudentAui')
    .controller('AppCtrl', ['$scope', '$state', 
        '$rootScope', 'CurrentUser',
        function($scope, $state, $rootScope, CurrentUser) {
            $scope.isLoginState = function() {
                return $state.is('login');
            };

            $scope.logout = function() {
                CurrentUser.logout();
                $state.go('login');
            };
            $scope.user = {
                username: CurrentUser.username()
            };


        }
    ]);
