angular.module('blankApp')
       .service('PictureService', PictureService);

function PictureService($http) {


  this.getPics = function($http) {
    console.log('in photos.service');
  };
}
