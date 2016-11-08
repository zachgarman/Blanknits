angular.module('blankApp')
       .controller('OrderController', OrderController);

function OrderController(PictureService) {
  console.log('OrderController loaded.');

  var order = this;
  order.yarns = [];

  // Changes value of selection from a JSON to a JS object that can be used
  order.parseJSON = function(selection) {
    order['color' + selection] = JSON.parse(order['selection' + selection]);
  };

  // Used to track order and send summary to Owner.
  order.submit = function(form) {
    // Trigger validation flag.
    order.submitted = true;
    // If form is invalid, return and show validation errors.
    if (form.$invalid) {
      console.log(form.$invalid);
      return;
    }

    order.summary = {
      type: order.type,
      size: order.size,
      color1: order.color1.name || 'N/A',
      color2: order.color2.name || 'N/A',
      giftee: order.giftInfo || 'Not Provided',
      comments: order.comments
    }
    console.log('summarize: ', order.summary);
  };

  // Disable color selection for lamb blankets, remove images
  order.resetColors = function() {
    if (order.type == 'lamb') {
      order.selection1 = "";
      order.selection2 = "";
      order.color1 = "";
      order.color2 = "";
    }
  };



  // S3 call to get all colors images
  order.getYarns = function() {
    PictureService.getYarns()
                  .then(function(response) {
                    order.yarns = response;
                  });
  };

  if (order.yarns.length == 0) {
    order.getYarns();
  }

}
