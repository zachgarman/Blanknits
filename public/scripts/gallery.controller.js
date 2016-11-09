angular.module('blankApp')
       .controller('GalleryController', GalleryController);

function GalleryController(PictureService) {
  console.log('GalleryController loaded.');
  var gallery = this;

  gallery.allPics = [];

  gallery.loadPics = function() {
      PictureService.getPics()
                    .then(function(response) {
                      gallery.allPics = response;
                      });
  };

  if (gallery.allPics.length == 0) {
    gallery.loadPics();
  }

  gallery.setClass = function(index) {
    if (gallery.sizeClass[index] == 'larger-image') {
      gallery.sizeClass[index] = '';
    } else {
      gallery.sizeClass[index] = 'larger-image';
    }
  };

}
