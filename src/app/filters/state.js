'use strict';

angular.module('bodhiStudentAui')
    .filter('state', [function() {
        return function(s) {
            switch (s){
              case 0: return '正常';
              case 1: return '休学';
              case 2: return '退学';
            }
            return s;
        }
    }]);
