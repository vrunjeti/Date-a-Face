'use strict';

/**
 * @ngdoc function
 * @name 411t2App.controller:SearchCtrl
 * @description
 * # SearchCtrl
 * Controller of the 411t2App
 */
angular.module('411t2App')
  .controller('SearchCtrl', function ($http, $scope) {
    // bind 'this' to vm (view-model)
	var vm = this;

	var url = 'http://localhost:8000/sql/';

    $scope.$on('$viewContentLoaded', function() {
      vm.loadAllItems();
    });

    vm.loadAllItems = function(){
        $http
            .get(url + 'select?table=Item&attr=*')
            .success(function (data) {
                vm.sresults = data;
            });
    }

    vm.searchWithQuery = function(){
    /**
    * GET Route /search/item
    * @params query
    * Usage:
    * GET item/search?query='something to search'
    */
        $http
            .get(url + 'item/search', {
                params: {
                    query: vm.squery
                }
            })
            .success(function(data){
                vm.sresults = data;
            });
    }

  	vm.load = function(){

  		/**
		* GET Route /search/item
		* @params query
		* Usage:
		* GET item/search?query='something to search'
		*/
	
                            $http
                                .get(url + 'item/search', {
                                    params: {
                                        query: vm.squery
                                    }
                                })
                                .success(function(data){
                                    vm.sresults = data;
                                    // vm.squery = '';
                                });

                    // note temp code
	         /*  $http
                        .get("http://localhost:8000/auth/profile/items", {
                            params: {
                                query: vm.squery
                            }
                        })
                        .success(function(data){
                            //vm.sresults = data;
                            // vm.squery = '';
                        });
             */
            };
  
        if(vm.squery === '' || vm.squery === undefined) vm.loadAllItems();
        else vm.searchWithQuery();

/*      // note temp code
        $http
            .get("http://localhost:8000/auth/profile/items", {
                params: {
                    query: vm.squery
                }
            })
            .success(function(data){
                //vm.sresults = data;
                // vm.squery = '';
            });*/

    };

  });



// inventory (items)
// look up underscore vs hyphen conventions for json
// look for library/plugin for formatting price
// key for finding seller, seller info (rating, other items)
