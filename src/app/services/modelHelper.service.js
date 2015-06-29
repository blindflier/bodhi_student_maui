'use strict';

angular.module('bodhiStudentAui')
    .factory('ModelHelper', ['$state', 'RestHelper', function($state, RestHelper) {

        return {
            'destroyModel': destroyModel,
            'updateModel': updateModel,
            'initAdd': initAdd,
            'loadModels': loadModels,
            'submitModel': submitModel
        };

        function destroyModel(scope, RestModelService, confirm) {

            confirm = confirm || 'confirmData';
            var currentModel;

            var confirmData = {
                oncancel: function() {
                    confirmData.show = false;
                }
            };

            scope[confirm] = confirmData;
            scope.server = scope.server || {};

            return function(m, label, callback) {
                currentModel = m;
                confirmData.header = '确认删除操作';
                confirmData.icon = "large warning circle red"
                confirmData.desc = "您确定要删除" + label + "吗?";
                confirmData.show = true;
                confirmData.onok = function() {
                    confirmData.show = false;
                    RestHelper.restCall({
                        'promise': RestModelService.remove({
                            id: currentModel.id
                        }).$promise,
                        'callback': callback || scope.loadModels,
                        'server': scope.server
                    });
                }
            };

        };

        function updateModel(prefix) {
            if (!prefix)
                prefix = "^";
            return function(data) {
                $state.go(prefix + '.update', {
                    'model': data
                });
            };
        };

        function initAdd(scope, updateLabel, addLabel, stateModel, defaultData, returnBack) {
            if ($state.is('^.update')) {
                //console.log(stateModel);
                if (stateModel && stateModel.id) {
                    scope.header = updateLabel;
                } else
                    return $state.go(returnBack || '^.all');
            } else {
                scope.header = addLabel;
            }
            scope.model = angular.extend(scope.model || {}, stateModel || defaultData || {});
        };

        function loadModels(RestModelService, scope, doNotAssignModels) {
            scope.limit = scope.limit || 10;
            scope.pages = scope.pages || 1;
            scope.currentPage = scope.currentPage || 1;
            scope.search = scope.search || {};
            return function(page) {
                //console.log('loading ' + page);
                if (scope.pages > 0 && page) {
                    scope.currentPage = Math.min(page, scope.pages);
                }
                var option = {
                    offset: scope.limit > 0 ? scope.limit * (scope.currentPage - 1) : 0,
                    limit: scope.limit
                };
                angular.extend(option, scope.search);


                RestModelService.get(option, function(resp) {
                    if (!doNotAssignModels)
                        scope.models = resp.data;
                    if (scope.$broadcast)
                        scope.$broadcast('ModelLoaded', resp.data);
                    scope.pages = Math.ceil(resp.total / scope.limit);
                }, function(err) {
                    console.log(err);
                });
            };
        };

        function submitModel(RestModelService, scope, resetData, returnBack) {
            scope.server = scope.server || {};
            return function() {
                if ($state.is('^.add')) {
                    return saveModel(scope.model);
                }
                if ($state.is('^.update'))
                    return updateModel(scope.model, returnBack);
            };

            function saveModel(d) {
                RestHelper.restCall({
                    'promise': RestModelService.save(d).$promise,
                    'callback': function() {
                        scope.model = angular.extend({}, resetData || {});
                        scope.$broadcast('afterSave', d);
                    },
                    'server': scope.server
                });
            };

            function updateModel(d, returnBack) {
                RestHelper.restCall({
                    'promise': RestModelService.update(d).$promise,
                    'state': returnBack || '^.all',
                    'server': scope.server
                });
            }
        };






    }]);
