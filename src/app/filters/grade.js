'use strict';

angular.module('bodhiStudentAui')
    .filter('grade', [function() {
        return function(g) {
            return g.city+g.genre+g.seq;
        }
    }]);
