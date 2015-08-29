'use strict';

angular.module('bodhiStudentAui')
.factory('Checkin', ['$resource', function($resource){
  return $resource('/api/checkin/:id',{'id':'@id'},{
    'update' : {method:'PUT'}
  });
}]);
