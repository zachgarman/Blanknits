angular.module('blankApp')
       .service('PictureService', PictureService);

function PictureService($http) {
  // Send request to server to get all stork blankets from S3.
  this.getPics = function() {
    return $http.get('/blankGallery/blanknits-images')
      .then(function(urls) {
        var responseObject = {
          babyName: [],
          babyMisc: [],
          babyQuilt: [],
          assorted: [],
          lamb: [],
          logo: [],
          momento: [],
          symbol: [],
        };
        urls.data.forEach(function(image) {
          var innerKey = image.code;
          responseObject[innerKey].push(image.url);
        });
        return responseObject;
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

  // Send request to server for all yarn images form S3.
  this.getYarns = function() {
    return $http.get('/blankGallery/blanknits-yarns')
      .then(function(yarns) {
        return yarns.data;
      });
  }
}
