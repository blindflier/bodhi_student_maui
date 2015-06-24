'use strict';

angular.module('bodhiStudentAui')
.factory('Student', ['$resource', function($resource){
  return $resource('/api/students/:id',{'id':'@id'},{
    'update' : {method:'PUT'}
  });
}]);
