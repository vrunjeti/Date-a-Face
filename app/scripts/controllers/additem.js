'use strict';
 
/**
 * @ngdoc function
 * @name 411t2App.controller:AdditemCtrl
 * @description
 * # AdditemCtrl
 * Controller of the 411t2App
 */
angular.module('411t2App')
  .controller('AdditemCtrl', function ($http, $scope) {
    // bind 'this' to vm (view-model)
	var vm = this;
	var url = 'http://localhost:8000/sql/';
 
	$scope.fileName = 'balhss';
 
	document.getElementById("upload-pseudo").addEventListener("click", function(event) {
		console.log(event);
		document.getElementById("upload").click();
	});
 
	document.getElementById("upload").addEventListener("change", function(event) {
		console.log(event);
		vm.fileName = event.target.files[0].name;
		vm.file = event.target.files[0];
		$scope.$apply();
	});
 
	vm.insert = function(formData){
		/**
		* POST Route /insert
		* @params table - REQUIRED
		* @params attr - REQUIRED
		* Usage:
		* GET /sql/insert?table=Item&attr="Girl Scout Cookies", "Thin mints","Yummy snacks for all to enjoy!",  20.00, 1
		* Translated to MySQL: INSERT INTO table VALUES (attr);
		*/
 
		$http
			.post(url + 'insert', {
					table: 'Item',
					attr: '"' + formData.name + '","' + formData.shortDes + '","' + formData.longDesc + '",' + formData.price + ',' + 1 // 1 at end is userId, hardcoded for now
			})
			.success(function(){
				alert('Item inserted.');
				formData.name = '';
				formData.longDesc = '';
				formData.shortDes = '';
				formData.price = '';
				formData.email = '';
			});
	};
 
	vm.upload = function(formData)
	{
	$('.upload_form').append($.cloudinary.unsigned_upload_tag("ekt6gwpq",
  { cloud_name: 'mzheng6' }));
	}
 
  });
 