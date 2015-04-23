'use strict';

/**
 * @ngdoc function
 * @name 411t2App.controller:ProfileCtrl
 * @description
 * # ProfileCtrl
 * Controller of the 411t2App
 */
angular.module('411t2App')
  .controller('ProfileCtrl', function ($http, $scope) {

    var vm = this;
    var url = 'http://localhost:8000/auth/'

    $scope.$on('$viewContentLoaded', function() {
      vm.loadProfile();
      vm.loadUserItems();
    });

    vm.loadProfile = function(){
        $http
            .get(url + 'profile')
            .success(function (data) {
               vm.profileData = data.payload;
            });
    }

    vm.loadUserItems = function () {
        $http
            .get(url + 'profile/items')
            .success(function(data){
                vm.items = data.payload;
            });
    }


  });
