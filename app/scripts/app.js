'use strict';

/**
 * @ngdoc overview
 * @name 411t2App
 * @description
 * # 411t2App
 *
 * Main module of the application.
 */
angular
  .module('411t2App', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch'
  ])
  .config(function ($routeProvider, $httpProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        controllerAs: 'mainC'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl',
        controllerAs: 'aboutC'
      })
      .when('/search', {
        templateUrl: 'views/search.html',
        controller: 'SearchCtrl',
        controllerAs: 'searchC'
      })
      .when('/item/:itemId', {
        templateUrl: 'views/item.html',
        controller: 'ItemCtrl',
        controllerAs: 'itemC'
      })
      .when('/addItem', {
        templateUrl: 'views/additem.html',
        controller: 'AdditemCtrl',
        controllerAs: 'additemC'
      })
      .when('/adduser', {
        templateUrl: 'views/adduser.html',
        controller: 'AdduserCtrl',
        controllerAs: 'adduserC'
      })
      .when('/login', {
        templateUrl: 'views/login.html',
        controller: 'LoginCtrl',
        controllerAs: 'loginC'
      })
      .when('/profile', {
        templateUrl: 'views/profile.html',
        controller: 'ProfileCtrl',
        controllerAs: 'profileC'
      })
      .when('/updateitem/:itemId', {
        templateUrl: 'views/updateitem.html',
        controller: 'UpdateitemCtrl',
        controllerAs: 'updateItemC'
      })
      .otherwise({
        redirectTo: '/'
      });

$httpProvider.interceptors.push(['$q', '$location', '$window', function ($q, $location, $window) {
            return {
                'request': function (config) {
                    config.headers = config.headers || {};
                    if ($window.sessionStorage.token) {
                        config.headers.Authorization = 'Bearer ' + $window.sessionStorage.token;
                    }
                    return config;
                },
                'responseError': function(response) {
                    if(response.data.data === "Error Occured") {
                        $location.path('/signin');
                    }
                    return $q.reject(response);
                }
            };
        }]);
  });
  // .factory('Stuff', function($http){
  //     var myFactory = {};
  //     myFactory.all = function(){
  //       return $http.get("http://localhost:8000/sql/select/Item/*/name='" + vm.squery + "'");
  //     };
  //     return myFactory;
  // })
