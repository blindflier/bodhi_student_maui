'use strict';

angular.module('bodhiStudentAui')
    .filter('rolenames', [function() {
        return function(roles) {
            var len = roles.length;
            var names = [];
            for (var i = 0; i < len; i++)
                names[i] = roles[i].name;
            return names.join();
        }
    }]);
