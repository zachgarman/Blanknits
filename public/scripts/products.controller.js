angular.module('blankApp')
       .controller('ProductsController', ProductsController);

function ProductsController (PictureService) {
  console.log('ProductsController loaded.');

  var products = this;
  products.yarns = [];

  // S3 call to get all colors images
  products.getYarns = function() {
    PictureService.getYarns()
                  .then(function(response) {
                    products.yarns = response;
                    console.log('response', response);
                  });
  };

  if (products.yarns.length == 0) {
    products.getYarns();
  }

}
