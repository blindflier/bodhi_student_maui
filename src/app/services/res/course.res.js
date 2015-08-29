'use strict';

angular.module('bodhiStudentAui')
.factory('Course', ['$resource', function($resource){
  return $resource('/api/courses/:id',{'id':'@id'},{
    'update' : {method:'PUT'}
  });
}]);
