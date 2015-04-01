'use strict';

/**
 * @ngdoc function
 * @name 411t2App.controller:AdditemCtrl
 * @description
 * # AdditemCtrl
 * Controller of the 411t2App
 */
angular.module('411t2App')
  .controller('AdditemCtrl', function ($http) {
    // bind 'this' to vm (view-model)
	var vm = this;

	// example: POST /sql/insert/User/'Joe','Mama','yoyoma@gmail','7737189210','luigi',99
	vm.insert = function(formData){
		// id, name, shortDes, longDesc, price, userId
		// id is number, userId is email
		var id = Math.floor(Math.random() * 10000000);
		$http
			.post("http://localhost:8000/sql/insert/Item/" + id + ",'" + formData.name + "','" + formData.shortDes + "','" + formData.longDesc + "','" + formData.price + "','" + formData.email + "'", {})
			.success(function(){
				alert('Item inserted.');
				formData.name = '';
				formData.longDesc = '';
				formData.shortDes = '';
				formData.price = '';
				formData.email = '';
			});
	}

  });


