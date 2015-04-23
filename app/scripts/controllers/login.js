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

	vm.login = function(formData){

		$http
			.post(url, {
				email: formData.email,
				password: formData.password
			})
			.success(function(data){
				if(!(data.message === "Error Occured")) {
					$window.sessionStorage.token = data.token;
					$location.path('/profile'); // redirect (search for now, then change to profile later)
				} else {
					vm.errorMsg = "Incorrect email or password. Please try again.";
				}
			});
	};
  });
