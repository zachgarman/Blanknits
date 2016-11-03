angular.module('blankApp')
       .controller('GalleryController', GalleryController);

function GalleryController(PictureService) {
  console.log('GalleryController loaded.');
  var gallery = this;

  gallery.allPics = [];

  gallery.loadPics = function() {
    PictureService.getPics()
                .then(function(response) {
                  console.log(response);
                  gallery.allPics = response;

                });


                //Once get request is received, add items to gallery.allPics array.
  };
  gallery.loadPics();
}
