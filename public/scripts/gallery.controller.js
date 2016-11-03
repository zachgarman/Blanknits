angular.module('blankApp')
       .controller('GalleryController', GalleryController);

function GalleryController(PictureService) {
  console.log('GalleryController loaded.');
  var gallery = this;

  gallery.allPics = [
    {
      url: 'https://s3.amazonaws.com/blanknits/Andrew_and_Laci.jpeg',
    },
  ];

  gallery.loadPics = function() {
    PictureService.getPics()
                .then(function(response) {
                  console.log(response);
                  //gallery.allPics = [{url: response}];
                });


                //Once get request is received, add items to gallery.allPics array.
  };
}
