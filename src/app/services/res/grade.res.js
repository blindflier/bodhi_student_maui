'use strict';

angular.module('bodhiStudentAui')
.factory('Grade', ['$resource', function($resource){
  return $resource('/api/grades/:id',{'id':'@id'},{
    'update' : {method:'PUT'}
  });
}]);
