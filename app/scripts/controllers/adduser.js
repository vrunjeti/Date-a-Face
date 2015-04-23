'use strict';

/**
 * @ngdoc function
 * @name 411t2App.controller:AdduserCtrl
 * @description
 * # AdduserCtrl
 * Controller of the 411t2App
 */
angular.module('411t2App')
  .controller('AdduserCtrl', function ($http, $window, $location) {
    

    var vm = this;
	var url = 'http://localhost:8000/sql/';

	vm.insert = function(formData){
/*
		$http
			.post(url + 'insert', {
					table: 'User',
					attr: '"' + formData.firstName + '","' + formData.lastName + '","' + formData.email + '",' + formData.phone + ',NULL,"' + formData.password + '"' // NULL is for rating
			})
			.success(function(){
				alert('Item inserted.');
				formData.firstName = '';
				formData.lastName = '';
				formData.email = '';
				formData.password = '';
				formData.phone = '';
			});
*/
		var url = 'http://localhost:8000/auth/signup';
		$http
		.post(url , {
			firstName : formData.firstName, 
			lastName : formData.lastName,
			email : formData.email,
			password : formData.password,
			phone : formData.phone
		})
		.success(function(data){
			if(!(data.message === "Error Occured")) {
				$window.sessionStorage.token = data.token;	
				$location.path('/profile'); // redirect (search for now, then change to profile later)
			} else {
				//  need to display to user that their signup failed
				formData.password = '';
			}
		});
	};
  });
