'use strict';

angular.module('bodhiStudentAui')
.directive('myPagination', [function(){
  // Runs during compile
  return {
 
    scope: {
      total: '=',
      current: '=',
      onpage: '&'
    },
    restrict: 'EAC', 
    templateUrl: '/app/directives/myPagination.temp.html',

    link: function(scope, iElm, iAttrs, controller) {
       
        scope.$watch(function(){
          scope.pages= generatePagesArray(scope.current,scope.total,10);
        });
        

        function generatePagesArray(currentPage, totalPages, paginationRange) {
            //console.log('generatePagesArray ' + currentPage +' ' + totalPages);
            var pages = [];
            var halfWay = Math.ceil(paginationRange / 2);
            var position;

            if (currentPage <= halfWay) {
                position = 'start';
            } else if (totalPages - halfWay < currentPage) {
                position = 'end';
            } else {
                position = 'middle';
            }

            var ellipsesNeeded = paginationRange < totalPages;
            var i = 1;
            while (i <= totalPages && i <= paginationRange) {
                var pageNumber = calculatePageNumber(i, currentPage, paginationRange, totalPages);

                var openingEllipsesNeeded = (i === 2 && (position === 'middle' || position === 'end'));
                var closingEllipsesNeeded = (i === paginationRange - 1 && (position === 'middle' || position === 'start'));
                if (ellipsesNeeded && (openingEllipsesNeeded || closingEllipsesNeeded)) {
                    pages.push('...');
                } else {
                    pages.push(pageNumber);
                }
                i ++;
            }
            //console.log(pages);
            return pages;
        }

        function calculatePageNumber(i, currentPage, paginationRange, totalPages) {
            var halfWay = Math.ceil(paginationRange/2);
            if (i === paginationRange) {
                return totalPages;
            } else if (i === 1) {
                return i;
            } else if (paginationRange < totalPages) {
                if (totalPages - halfWay < currentPage) {
                    return totalPages - paginationRange + i;
                } else if (halfWay < currentPage) {
                    return currentPage - halfWay + i;
                } else {
                    return i;
                }
            } else {
                return i;
            }
        }
    }
  };
}]);
