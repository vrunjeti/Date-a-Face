'use strict';

/**
 * @ngdoc function
 * @name 411t2App.controller:ItemCtrl
 * @description
 * # ItemCtrl
 * Controller of the 411t2App
 */
angular.module('411t2App')
  .controller('ItemCtrl', function ($http, $routeParams) {
    // bind 'this' to vm (view-model)
	var vm = this;

	// routing to specific item based on itemId
	vm.id = $routeParams.itemId;

	// get all items in inventory
	$http.get('./data/inventory.json').success(function(data) {
		vm.inventory = data;
	});

	// get seller information
	$http.get('./data/sellers.json').success(function(data) {
		vm.sellers = data;
	});
  });
