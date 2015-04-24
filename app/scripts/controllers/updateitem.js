'use strict';

/**
 * @ngdoc function
 * @name 411t2App.controller:UpdateitemCtrl
 * @description
 * # UpdateitemCtrl
 * Controller of the 411t2App
 */
angular.module('411t2App')
  .controller('UpdateitemCtrl', function ($http, $scope, $routeParams, $location, $window) {
    // bind 'this' to vm (view-model)
    var vm = this;
    var url = 'http://localhost:8000/';
    vm.itemId = $routeParams.itemId;
    vm.formData = {};

    $scope.$on('$viewContentLoaded', function(){

        if(!$window.sessionStorage.token){
            $location.path('/login');
        }

        // $http
        //     .get(url + 'auth/profile')
        //     .error(function(status) {
        //         if(status === 500);
        //             $location.path('/login');
        //     });

        vm.getItem().success(function(data){
            vm.itemData = data;
            vm.formData.name = data[0].name;
            vm.formData.price = data[0].price;
            vm.formData.shortDes = data[0].shortDes;
            vm.formData.longDesc = data[0].longDesc;
        });
    });

    vm.getItem = function() {
        return $http.get(url + 'sql/select', {
                params: {
                    table: 'Item',
                    attr: '*',
                    cond: 'id=' + vm.itemId
                }
            })
    }

    vm.updateItem = function(formData){
        $http
            .put(url + 'auth/profile/item', {
                    item_id: vm.itemId,
                    name: formData.name,
                    price: formData.price,
                    shortDes: formData.shortDes,
                    longDesc: formData.longDesc
            })
            .success(function(){
                //alert('Item updated.');
                formData.name = '';
                formData.longDesc = '';
                formData.shortDes = '';
                formData.price = '';
                formData.email = '';
                $location.path('/profile');
            });
    };
  });
