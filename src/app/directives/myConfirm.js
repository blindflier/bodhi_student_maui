'use strict';

angular.module('bodhiStudentAui')
.directive('myConfirm', ['$compile',function($compile){

  return {
    scope: {
      data: '='
    }, 
    restrict: 'EAC', // E = Element, A = Attribute, C = Class, M = Comment
    templateUrl: '/app/directives/myConfirm.temp.html',
  };
}]);
