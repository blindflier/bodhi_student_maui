'use strict';

angular.module('bodhiStudentAui')
    .factory('CurrentUser', ['StorageService', function(StorageService) {
        // AngularJS will instantiate a singleton by calling "new" on this function

        var token = StorageService.get('token');
        var screenWidth ;
        var user = {};

        screenWidth = window.innerWidth;
        if (window.devicePixelRatio)
                screenWidth= screenWidth * window.devicePixelRatio;

        user.isPhone = function() {
           return screenWidth <= 992;
        };

        user.tokenExpired = function() {
            if (!token) return true;
            var now = new Date();
            var exp = Date.parse(token.exp);
            return exp > now;
        };

        user.token = function() {
            return token;
        };
        user.login = function(data) {
            StorageService.put('token', data.token);
            token = data.token;
        };
        user.logout = function() {
            StorageService.remove('token');
            token = null;
            window.location = "/";
        };
        user.permissions = function() {
            return (token && token.student) ?
                token.student.permissions : [];
        };
        user.username = function() {
            if (token && token.student) {
                return token.student.username;
            }
            return '';
        };
        user.grade = function() {
            return (token && token.student) ?
                token.student.grade : null;
        };

  

        user.isStudyAdmin = function (argument) {
            return havePermission(user.permissions(),[
                'SUPER_ADMIN', 'SYSTEM_ADMIN', 'STUDY_ADMIN'
            ]);
        }

        return user;

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
    }]);
