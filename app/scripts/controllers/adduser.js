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
	
		var invalidstringf = (!formData.firstName || 0==formData.firstName.length || !formData.firstName.trim());
		var invalidstringl = (!formData.lastName || 0==formData.lastName.length || !formData.lastName.trim());
		var invalidstringp = (!formData.password || 0==formData.password.length || !formData.password.trim());

		var invalidphone = (!formData.phone || 0==formData.phone.length || !formData.phone.trim()) || isNaN(formData.phone);
		var invalidemailblank = (!formData.email || 0==formData.email.length || !formData.email.trim());
		var invalidemailillini = formData.email.replace(/.*@/, "")!="illinois.edu";


		if(invalidstringf) 
			vm.errstringf = "Please enter a valid first name."

		if(invalidstringl)
			vm.errstringl = "Please enter a valid last name."

		if(invalidemailblank || invalidemailillini)
			vm.emailerrmessage = "Only illinois.edu emails are accepted at this time."

		if(invalidstringp)
			vm.errstringp = "Please enter a valid password."

		if(invalidphone)
			vm.errmessage = "Please enter a valid phone number."

		if(!(invalidphone) && !(invalidemailblank) &&!(invalidemailillini) && !(invalidstringl) && !(invalidstringf) &&!(invalidstringp))
		{

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
		}
	};
  });
