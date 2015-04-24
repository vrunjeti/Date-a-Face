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

    vm.getSuggestion = function(formData) {
        $http.post(url + '/adv/pricesuggestion', {
                    name: formData.name,
                    shortDes: formData.shortDes,
                    longDesc: formData.longDesc
            })
            .success(function(data) {
                vm.suggestion = data.message;
            });
    };

    vm.updateItem = function(formData){

    var invaliditemnameu = (!formData.name || 0==formData.name.length || !formData.name.trim());
    var invalidshortu = (!formData.shortDes || 0==formData.shortDes.length || !formData.shortDes.trim());
    var invalidlongu = (!formData.longDesc || 0==formData.longDesc.length || !formData.longDesc.trim());
    var invalidpriceu = isNaN(formData.price) || (!formData.price || 0==formData.price.length || !formData.price.trim());
        
        if(invalidpriceu)
            vm.errpriceu = "Please enter a number value for price."
        if(invalidshortu)
            vm.errshortu = "Please don't leave the short description blank."
        if(invalidlongu)
            vm.errlongu = "Please don't leave the long description blank."
        if(invaliditemnameu)
            vm.erritemu = "Please give your item a name."

        if(!invalidpriceu && !invalidshortu && !invalidlongu &&!invaliditemnameu)
        {
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
        }
    };
  });
