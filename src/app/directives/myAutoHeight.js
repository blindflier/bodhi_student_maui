'use strict';

angular.module('bodhiStudentAui')
.directive('myAutoHeight', [function(){

  return {
    restrict: 'AC', // E = Element, A = Attribute, C = Class, M = Comment
    link: function(scope, iElm, iAttrs, controller) {
       var total = iElm.parent().outerHeight();  
       var other = 0;
       iElm.siblings().each(function(i,elem){
           other += $(elem).outerHeight();
       });    
       iElm.outerHeight(total-other);
    }
  };
}]);
