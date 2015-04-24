'use strict';

/**
 * @ngdoc function
 * @name 411t2App.controller:ProfileCtrl
 * @description
 * # ProfileCtrl
 * Controller of the 411t2App
 */
angular.module('411t2App')
  .controller('ProfileCtrl', function ($http, $scope, $window, $location) {

    var vm = this;
    var url = 'http://localhost:8000/auth/'

    $scope.$on('$viewContentLoaded', function() {
        if(!$window.sessionStorage.token){
            $location.path('/login');
        }
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

    vm.logout = function(){
        $http
            .get(url + 'profile/logout')
            .success(function(data){
                vm.logoutData = data;
                if(data.message === "Log Out") {
                    $window.sessionStorage.clear();
                    $location.path('/login');
                }
            });
    }

    vm.deleteItem = function(itemId) {
        $http
            .delete(url + 'profile/item', {
                params: {
                    itemid: itemId
                }
            })
            .success(function(data){
                vm.loadUserItems();
            });
    }

  });
