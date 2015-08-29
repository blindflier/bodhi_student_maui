'use strict';

angular.module('bodhiStudentAui')
    .filter('coursename', [function() {
        return function(c) {
            return c.subject+'('+ c.category+'-'+c.seq+')';
        }
    }]);
