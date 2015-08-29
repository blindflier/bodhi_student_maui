'use strict';

angular.module('bodhiStudentAui')
  .controller('GongxiuAllCtrl', ['$scope', '$timeout', '$state', 
    'Gongxiu','RestHelper','ModelHelper','CurrentUser',
    function($scope, $timeout, $state, Gongxiu,RestHelper,ModelHelper,
      CurrentUser) {

      $scope.inGradeJail = !CurrentUser.isStudyGongxiuAdmin();
      $scope.grade = CurrentUser.grade();

      $scope.search = {};
      if ($scope.inGradeJail){
        //console.log($scope.grade);
        if ($scope.grade && $scope.grade.id )
            $scope.search.grade_id =  $scope.grade.id;
        else
           $state.go('home');
      }
      $scope.loadModels = ModelHelper.loadModels(Gongxiu,$scope,true);
      $scope.onUpdate = ModelHelper.updateModel('study.gongxiu');
      $scope.destroyModel = ModelHelper.destroyModel($scope,Gongxiu);

      $scope.canCheckin = function(gongxiu){
        if (!$scope.inGradeJail) 
          return true;          
        var hold = new Date(Date.parse(gongxiu.holding_time));
        var start = moment(hold).subtract(1, 'hours');
        var end = moment(hold).add(1,'days').endOf('day');
        return moment().isBetween(start, end);
      };
      
      $scope.canEdit = function  (gongxiu) {
        if (!$scope.inGradeJail) 
          return true;    
        var hold = new Date(Date.parse(gongxiu.holding_time));
        return moment().isBefore(moment(hold));
      };

      $scope.onCheckin = function(data){
         $state.go('study.gongxiu.checkin', {
                    'model': data
         });
      };
    }
  ]);
