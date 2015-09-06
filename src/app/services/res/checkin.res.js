'use strict';

angular.module('bodhiStudentAui')
    .factory('Checkin', ['$resource', function($resource) {
        return $resource('/api/gongxiu/:gid/checkin/:cid', {
            'gid': '@gid',
            'cid': '@cid'
        }, {
            'update': {
                method: 'PUT'
            }
        });
    }]);
