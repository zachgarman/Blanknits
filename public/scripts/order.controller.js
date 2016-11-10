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

  // Determine if tax is applicable and show if so.
  order.tax = function() {
    if (order.resident) {
      return 'show-tax';
    } else {
      return 'no-show-tax';
    }
  };

  // Used to track order and send summary to Owner.
  order.submit = function(form) {
    // Trigger validation flag.
    order.submitted = true;
    // If form is invalid, return and show validation errors.
    if (form.$invalid) {
      console.log('Invalid Form?', form.$invalid);
      return;
    }
    order.summary = {
      type: order.type,
      size: order.size,
      color1: order.color1.name || 'N/A',
      color2: order.color2.name || 'N/A',
      name: order.name,
      giftee: order.giftInfo || 'Not Provided',
      residentAZ: order.resident || 'false',
      comments: order.comments,
      total: order.total(),
    }
    console.log('summarize: ', order.summary);
  };

  order.total = function() {
    var total = 0;
    if (order.type == 'stork') {
      switch (order.size) {
        case 'extra-small':
          total = 100;
          break;
        case 'small':
          total = 150;
          break;
        case 'medium':
          total = 175;
          break;
        case 'large':
          total = 190;
          break;
        default:
          total = 0;
      }
    } else if (order.type == 'lamb') {
      switch (order.size) {
        case 'extra-small':
          total = 230;
          break;
        case 'small':
          total = 350;
          break;
        case 'medium':
          total = 385;
          break;
        case 'large':
          total = 400;
          break;
        default:
          total = 0;
      }
    }
    if (order.resident) {
      total = total * 1.067;
    }
    return total;
  };

  // Disable color selection for lamb blankets, remove images
  order.resetColors = function() {
    if (order.type == 'lamb') {
      order.selection1 = "";
      order.selection2 = "";
      order.color1 = "";
      order.color2 = "";
      order.showColorSelection = '';
    }
    if (order.type == 'stork') {
      order.showColorSelection = 'space';
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

  order.setYarnClass = function(index) {
    if (order.sizeYarnClass[index] == 'enlarge') {
      order.sizeYarnClass[index] = '';
    } else {
      order.sizeYarnClass[index] = 'enlarge';
    }
  };

}
