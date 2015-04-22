'use strict';

/**
 * @ngdoc function
 * @name 411t2App.controller:ItemCtrl
 * @description
 * # ItemCtrl
 * Controller of the 411t2App
 */
angular.module('411t2App')
  .controller('ItemCtrl', function ($http, $routeParams, $scope) {
    // bind 'this' to vm (view-model)
	var vm = this;
	var url = 'http://localhost:8000/sql/';
	// routing to specific item based on itemId
	vm.id = $routeParams.itemId;

	$scope.$on('$viewContentLoaded', function(){
		vm.loadEverything();
	});
	
	vm.loadEverything = function(){
		vm.info().success(function(data){
			vm.itemData = data;
			vm.seller(data[0].userId)
		})
	}

	vm.info = function()
	{
		return $http.get(url + 'select', {
				params: { 
					table: 'Item', 
					attr: '*', 
					cond: 'id=' + vm.id
				}
			})
	}
			
	vm.seller = function (userId)
	{
		$http.get(url + 'select', {
				params: { 
					table: 'User', 
					attr: '*', 
					cond: 'id=' + userId
				}
			})
			.success(function(data){
				vm.sellerData = data;
			})
	}
});
