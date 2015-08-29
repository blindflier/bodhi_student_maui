'use strict';

angular.module('bodhiStudentAui')
    .filter('gradename', [function() {
        return function(g) {
            return g.city+g.genre+g.seq;
        }
    }]);
