'use strict';

angular.module('bodhiStudentAui')
  .factory('RestHelper', ['$state','$timeout',function($state,$timeout) {
    return {
      restCall: helper
    };

    function helper(params) {

      var promise = params['promise'];
      var state = params['state'];
      var server = params['server'];
      var callback = params['callback'];

      promise.then(function(resp) {
          server.show = true;
          server.success = resp.success;
          //console.log(resp);
          if (resp.success) {
            if (state)
              $state.go(state);
            else {
              server.msgHeader = '操作成功';
              server.msgBody = '';
              callback.call();
              $timeout(function() {
                server.show = false;
              }, 2000);
            }
          } else {
            server.msgHeader = '操作失败';
            server.msgBody = resp.error;
          }

        })
        .catch(function(err) {
          server.show = true;
          server.success = false;
          server.msgHeader = '操作失败';
          server.msgBody = err;
        });
    }
  }]);
