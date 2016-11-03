angular.module('blankApp')
       .service('PictureService', PictureService);

function PictureService($http) {

  console.log('in photos.service');


  // Send request to server to get pics from database.
  this.getPics = function() {
    console.log('got a request to service');

    return $http.get('/blankGallery')
      .then(function(response) {
        return response.data;
      });
  };

}