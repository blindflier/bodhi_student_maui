'use strict';

angular.module('bodhiStudentAui')
    .filter('gender', [function() {
        return function(g) {
           if (g) 
            return '男';
          else
            return '女';
        }
    }]);
