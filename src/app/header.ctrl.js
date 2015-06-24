'use strict';

angular.module('bodhiStudentAui')
  .controller('HeaderCtrl', ['$scope','$location',function ($scope,$location) {
   
    $scope.isHome = function(){
      return $location.path() == '/';
    };

    $scope.isInfo = function(){
      var patterns = [/^\/gradeinfo/,/^\/studentinfo/];
      return matchPatterns(patterns);
    }
    
    function matchPatterns(patterns){
       var path = $location.path(); 
       var match = false;
       angular.forEach(patterns,function(pat){
          if (!match && pat.test(path) )
               match = true;
        });
       return match;
    }

  }]);
