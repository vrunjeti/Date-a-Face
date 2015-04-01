'use strict';

/**
 * @ngdoc function
 * @name 411t2App.controller:SearchCtrl
 * @description
 * # SearchCtrl
 * Controller of the 411t2App
 */
angular.module('411t2App')
  .controller('SearchCtrl', function ($http) {
    // bind 'this' to vm (view-model)
	var vm = this;

	// // get all items in inventory
	// $http.get('./data/inventory.json').success(function(data) {
	// 	vm.inventory = data;
	// });

	// // get seller information
	// $http.get('./data/sellers.json').success(function(data) {
	// 	vm.sellers = data;
	// });

  	vm.load = function(){
  		// example: GET /sql/select/User/*/firstName='Bob'
		$http
			.get("http://45.55.186.239:8000/sql/select/Item/*/name='" + vm.squery + "'")
			.success(function(data){
				vm.sresults = data;
				vm.squery = '';
			});

	}
  
  });
		


// inventory (items)
// look up underscore vs hyphen conventions for json
// look for library/plugin for formatting price
// key for finding seller, seller info (rating, other items)
