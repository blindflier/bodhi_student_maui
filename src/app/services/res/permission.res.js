'use strict';

angular.module('bodhiStudentAui')
.factory('Permission', ['$resource', function($resource){
  return $resource('/api/permissions/:id',{'id':'@id'},{
    'update' : {method:'PUT'}
  });
}]);
