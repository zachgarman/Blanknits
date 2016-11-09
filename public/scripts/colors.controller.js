angular.module('blankApp')
       .controller('ColorsController', ColorsController);

function ColorsController (PictureService) {
  console.log('ColorsController loaded.');

  var colors = this;
  colors.yarns = [];

  // S3 call to get all colors image
  colors.getYarns = function() {
    PictureService.getYarns()
                  .then(function(response) {
                    colors.yarns = response;
                  });
  };

  if (colors.yarns.length == 0) {
    colors.getYarns();
  }

  colors.setClass = function(index) {
    if (colors.sizeClass[index] == 'enlarge') {
      colors.sizeClass[index] = '';
    } else {
      colors.sizeClass[index] = 'enlarge';
    }
  };
}
