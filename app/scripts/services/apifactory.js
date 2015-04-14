'use strict';

/**
 * @ngdoc service
 * @name 411t2App.APIFactory
 * @description
 * # APIFactory
 * Factory in the 411t2App.
 */
angular.module('411t2App')
  .factory('APIFactory', function ($http) {
    // Public API here
    return {
      someMethod: function () {
        return meaningOfLife;
      },
      post: function(table, attr) {
        // return $http.post()
      }
    };
  });
