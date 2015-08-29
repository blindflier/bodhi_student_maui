'use strict';

angular.module('bodhiStudentAui')
    .factory('TokenInceptor', ['CurrentUser', function(CurrentUser) {
        return {
            'request': function(config) {
                var token = CurrentUser.token();
                if (token && token.token){
                    config.headers['jwt-token'] = token.token;
                }
                return config;
            }

        };

    }]);
