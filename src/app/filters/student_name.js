'use strict';

angular.module('bodhiStudentAui')
    .filter('student_name', [function() {
        return function(s) {
            if (s && s.name )
              return s.bud_name ?  s.name+'(' +s.bud_name +')' : s.name;
            return undefined;
        }
    }]);
