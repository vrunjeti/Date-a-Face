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
  .config(function ($routeProvider) {
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
      .otherwise({
        redirectTo: '/'
      });
  });
