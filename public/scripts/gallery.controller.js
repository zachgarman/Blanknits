angular.module('blankApp')
       .controller('GalleryController', GalleryController);

function GalleryController(PictureService) {
  console.log('GalleryController loaded.');
  var gallery = this;

  gallery.loadPics = function() {
    PhotoService.getPics()
                .then(function(response) {
                  console.log('Got pics.', response)
                });
  };
}
