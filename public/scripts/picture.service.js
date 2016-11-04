angular.module('blankApp')
       .service('PictureService', PictureService);

function PictureService($http) {
  // Send request to server to get all pics from S3.
  this.getPics = function() {
    return $http.get('/blankGallery')
      .then(function(urls) {
        return urls.data;
      });
  };

  // Get the home-page main image, image will be the first one in the bucket if
  // more than one is present.
  this.getHomeImage = function() {
    return $http.get('/blankGallery/home')
      .then(function(response) {
        return response.data.url;
      });
  };
}
