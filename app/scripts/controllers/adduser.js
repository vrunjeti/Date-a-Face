'use strict';

/**
 * @ngdoc function
 * @name 411t2App.controller:AdduserCtrl
 * @description
 * # AdduserCtrl
 * Controller of the 411t2App
 */
angular.module('411t2App')
  .controller('AdduserCtrl', function ($http) {
    

    var vm = this;
	var url = 'http://localhost:8000/sql/';

	vm.insert = function(formData){
		/**
		* POST Route /insert 
		* @params table - REQUIRED
		* @params attr - REQUIRED
		* Usage:
		* GET /sql/insert?table=Item&attr="Girl Scout Cookies", "Thin mints","Yummy snacks for all to enjoy!",  20.00, 1
		* Translated to MySQL: INSERT INTO table VALUES (attr);
		*/

		// firstName, lastName, email, phone, rating, password

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
	}


  });
