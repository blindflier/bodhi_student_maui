'use strict';

angular.module('bodhiStudentAui')
.factory('User', ['$resource', function($resource){
  return $resource('/api/users/:id',{'id':'@id'},{
    'update' : {method:'PUT'}
  });
}]);
