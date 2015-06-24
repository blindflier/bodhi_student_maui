'use strict';

angular.module('bodhiStudentAui')
.factory('Role', ['$resource', function($resource){
  return $resource('/api/roles/:id',{'id':'@id'},{
    'update' : {method:'PUT'}
  });
}]);
