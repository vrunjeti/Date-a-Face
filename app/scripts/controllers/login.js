'use strict';

/**
 * @ngdoc function
 * @name 411t2App.controller:LoginCtrl
 * @description
 * # LoginCtrl
 * Controller of the 411t2App
 */
angular.module('411t2App')
  .controller('LoginCtrl', function ($http, $window, $location) {
	    
    var vm = this;
	var url = 'http://localhost:8000/auth/login';

	vm.insert = function(formData){
/*
		$http
			.post(url + 'insert', {
					table: 'User',
					attr: '"' + formData.email + '","' + formData.password + '"' // NULL is for rating
			})
			.success(function(){
				alert('Item inserted.');
				formData.email = '';
				formData.password = '';
			});
*/	
			$http
			.post(url, {
				email: formData.email,
				password: formData.password
			})
			.success(function(data){
				if(!(data.message === "Error Occured")) {
					$window.sessionStorage.token = data.token;	
					$location.path('/search'); // redirect (search for now, then change to profile later)
				} else {
					//  need to display to user that their login failed
				}
			});
	};
  });
