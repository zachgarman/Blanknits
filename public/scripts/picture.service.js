angular.module('blankApp')
       .service('PictureService', PictureService);

function PictureService($http) {

  console.log('in photos.service');


  // Send request to server to get pics from database.
  this.getPics = function() {
    console.log('got a request to service');

    return $http.get('/blankGallery')
      .then(function(urls) {
        console.log(urls);

        return urls.data;
      });
  };
  // this works for a single picture using getSignedUrl
  // this.getPics = function() {
  //   console.log('got a request to service');
  //
  //   return $http.get('/blankGallery')
  //     .then(function(url) {
  //       console.log(url.data);
  //
  //       return url.data;
  //     });
  // };

}
