'use strict';

/**
 * @ngdoc function
 * @name 411t2App.controller:LoginCtrl
 * @description
 * # LoginCtrl
 * Controller of the 411t2App
 */
angular.module('411t2App')
  .controller('LoginCtrl', function ($http) {
	    
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
					attr: '"' + formData.email + '","' + formData.password + '"' // NULL is for rating
			})
			.success(function(){
				alert('Item inserted.');
				formData.email = '';
				formData.password = '';
			});
	};


  });
