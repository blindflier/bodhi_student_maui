'use strict';

angular.module('bodhiStudentAui')
  .factory('StorageService', ['$cookieStore', function($cookieStore) {
    // AngularJS will instantiate a singleton by calling "new" on this function

    var store = {

      isLocalStorage: !!window.localStorage,
      
      get: function(key) {
        return this.isLocalStorage ?
          angular.fromJson(window.localStorage.getItem(key)) :
          $cookieStore.get(key);
      },

      put: function(key, val) {
        this.isLocalStorage ?
          window.localStorage.setItem(key,angular.toJson(val)) :
          $cookieStore.put(key, val);
      },

      remove: function(key) {
       this.isLocalStorage ?
          window.localStorage.removeItem(key) :
          $cookieStore.remove(key);
      },

      clear: function() {
        if (this.isLocalStorage)
          window.localStorage.clear();
        else
          throw 'Method not support';
      }

    };

    return store;

  }]);
