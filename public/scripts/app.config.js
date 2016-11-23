angular.module('blankApp')
       .config(function($routeProvider, $locationProvider){
         $locationProvider.html5Mode(true);

         $routeProvider.when('/home', {
           templateUrl: 'views/home.html',
           controller: 'HomeController as home',
         }).when('/gallery/babyName', {
           templateUrl: 'views/gallery/babyName.html',
           controller: 'GalleryController as gallery',
         }).when('/gallery/customized', {
           templateUrl: 'views/gallery/customized.html',
           controller: 'GalleryController as gallery',
         }).when('/gallery/momento', {
           templateUrl: 'views/gallery/momento.html',
           controller: 'GalleryController as gallery',
         }).when('/gallery/symbol', {
           templateUrl: 'views/gallery/symbol.html',
           controller: 'GalleryController as gallery',
         }).when('/gallery/logo', {
           templateUrl: 'views/gallery/logo.html',
           controller: 'GalleryController as gallery',
         }).when('/gallery/lamb', {
           templateUrl: 'views/gallery/lamb.html',
           controller: 'GalleryController as gallery',
         }).when('/products/materials', {
           templateUrl: 'views/products/materials.html',
         }).when('/products/colors', {
           templateUrl: 'views/products/colors.html',
           controller: 'ColorsController as colors',
         }).when('/order', {
           templateUrl: 'views/order.html',
           controller: 'OrderController as order',
         }).when('/aboutUs', {
           templateUrl: 'views/aboutUs.html',
           controller: 'AboutController as about',
         }).when('/thankyou', {
           templateUrl: 'views/thankyou.html',
         }).when('/admin/login', {
           templateUrl: 'views/admin/login.html',
         }).when('/admin/home', {
           templateUrl: 'views/admin/home.html',
           controller: 'AdminController as admin',
         }).otherwise({
           redirectTo: '/home',
         });

       });
