angular.module('blankApp')
       .controller('ColorsController', ColorsController);

function ColorsController (PictureService) {
  console.log('ColorsController loaded.');

  var colors = this;
  colors.yarns = [];

  colors.showModal = function(url, name) {
    colors.modalUrl = url;
    colors.modalName = name;
    console.log(url, name);
  };

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

  colors.setYarnClass = function(index) {
    if (colors.sizeYarnClass[index] == 'enlarge') {
      colors.sizeYarnClass[index] = '';
    } else {
      colors.sizeYarnClass[index] = 'enlarge';
    }
  };

  colors.allPics = [];

  colors.loadPics = function() {
    PictureService.getPics()
                  .then(function(response) {
                    colors.allPics = response;
                    });
  };

  if (colors.allPics.length == 0) {
    colors.loadPics();
  }

  colors.setClass = function(index) {
    if (colors.sizeClass[index] == 'larger-image') {
      colors.sizeClass[index] = '';
    } else {
      colors.sizeClass[index] = 'larger-image';
    }
  };

}
