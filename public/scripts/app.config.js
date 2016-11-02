angular.module('blankApp')
       .config(function($routeProvider, $locationProvider){
         $locationProvider.html5Mode(true);

         $routeProvider.when('/home', {
           templateUrl: 'views/home.html',
           controller: 'HomeController as home',
         }).when('/gallery', {
           templateUrl: 'views/gallery.html',
           controller: 'GalleryController as gallery',
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
