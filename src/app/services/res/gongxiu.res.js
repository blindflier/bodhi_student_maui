'use strict';

angular.module('bodhiStudentAui')
.factory('Gongxiu', ['$resource', function($resource){
  return $resource('/api/gongxiu/:id',{'id':'@id'},{
    'update' : {method:'PUT'}
  });
}]);
