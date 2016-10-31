angular.module('blankApp')
       .config(function($routeProvider, $locationProvider){
         $locationProvider.html5Mode(true);

         $routeProvider.when('/home', {
           templateUrl: 'views/home.html',
         }).when('/gallery', {
           templateUrl: 'views/gallery.html',
         }).when('/materials', {
           templateUrl: 'views/materials.html',
         }).when('/order', {
           templateUrl: 'views/order.html',
         }).when('/aboutUs', {
           templateUrl: 'views/aboutUs.html',
         }).otherwise({
           redirectTo: '/home',
         });

       });
