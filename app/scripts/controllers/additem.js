'use strict';

/**
 * @ngdoc function
 * @name 411t2App.controller:AdditemCtrl
 * @description
 * # AdditemCtrl
 * Controller of the 411t2App
 */
angular.module('411t2App')
  .controller('AdditemCtrl', function ($http, $scope, $location, $window) {
    // bind 'this' to vm (view-model)
	var vm = this;
	var url = 'http://localhost:8000/auth/';

	$scope.fileName = 'balhss';

    $scope.$on('$viewContentLoaded', function() {
    	if(!$window.sessionStorage.token){
            $location.path('/login');
        }
        // $http
        //     .get(url + 'profile')
        //     .success(function(data, status){
        //         if(data.message === "Error Occured"){
        //             $location.path('/login');
        //         }
        //     });
    });

	document.getElementById("upload-pseudo").addEventListener("click", function(event) {
		console.log(event);
		document.getElementById("upload").click();
	});

	document.getElementById("upload").addEventListener("change", function(event) {
		console.log(event);
		vm.fileName = event.target.files[0].name;
		vm.file = event.target.files[0];
		$scope.$apply();
		vm.objectURL = $window.URL.createObjectURL(vm.file);
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

		var invaliditemname = (!formData.name || 0==formData.name.length || !formData.name.trim());
		var invalidshort = (!formData.shortDes || 0==formData.shortDes.length || !formData.shortDes.trim());
		var invalidlong = (!formData.longDesc || 0==formData.longDesc.length || !formData.longDesc.trim());
		var invalidprice = isNaN(formData.price) || (!formData.price || 0==formData.price.length || !formData.price.trim());
		if(invalidprice)
			vm.errprice = "Please enter a number value for price."
		if(invalidshort)
			vm.errshort = "Please don't leave the short description blank."
		if(invalidlong)
			vm.errlong = "Please don't leave the long description blank."
		if(invaliditemname)
			vm.erritem = "Please give your item a name."

		if(!invalidprice && !invalidshort && !invalidlong &&!invaliditemname)
		{
		$http
			.post(url + 'profile/item', {
				name: formData.name,
				price: formData.price,
				shortDes: formData.shortDes,
				longDesc: formData.longDesc
					// table: 'Item',
					// attr: '"' + formData.name + '","' + formData.shortDes + '","' + formData.longDesc + '",' + formData.price + ',' + 1 // 1 at end is userId, hardcoded for now
			})
			.success(function(data){
				//alert('Item inserted.');
				formData.name = '';
				formData.longDesc = '';
				formData.shortDes = '';
				formData.price = '';
				// formData.email = '';
				// vm.postData = data.id.insertId;
				$location.path('/item/' + data.id.insertId);
			});

		}
	};

	vm.upload = function()
	{
	$('.upload_form').append($.cloudinary.unsigned_upload_tag("ekt6gwpq",
  { cloud_name: 'mzheng6' }));
	}

  });
