angular.module('blankApp')
       .controller('OrderController', OrderController);

function OrderController(PictureService, OrderService) {
  console.log('OrderController loaded.');

  var order = this;
  order.yarns = [];
  order.resident = false;

  order.ppButtonValue = function() {
    if (order.resident==false) {
      return '5P4Y45R6LPFDS';
    } else {
      return 'C5HEXH8KDA4U2';
    }
  };

  // Changes value of selection from a JSON to a JS object that can be used
  order.parseJSON = function(selection) {
    order['color' + selection] = JSON.parse(order['selection' + selection]);
  };

  // Populate options for both dropdowns.
  order.typeOptions = ['Stork Blanknit', 'Lamb Blanknit'];
  order.sizeOptions = [];
  order.sizeOptionOptions =
  [
    ['Extra Small (car-seat) Stork', 'Small (crib-size) Stork', 'Medium Stork', 'Large Stork'],
    ['Extra Small (car-seat) Lamb', 'Small (crib-size) Lamb', 'Medium Lamb', 'Large Lamb']
  ];
  // Options on second dropdown are dependent on first.  This function is run
  // in order.resetColors() each time the type is changed;
  order.changeOptions = function () {
    var key = order.typeOptions.indexOf(order.type);
    var sizeOptions = order.sizeOptionOptions[key];
    order.sizeOptions = sizeOptions;
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
    var str = order.size;
    var lastIndex = str.lastIndexOf(' ');
    size = str.substring(0, lastIndex);

    order.summary = {
      type: order.type,
      size: size,
      color1: order.color1.name || 'N/A',
      color2: order.color2.name || 'N/A',
      name: order.name,
      email: order.email,
      giftee: order.giftInfo || 'Not Provided',
      residentAZ: order.resident || 'false',
      comments: order.comments,
      total: order.total().toFixed(2),
    }

    console.log('summarize: ', order.summary);
    OrderService.sendSummary(order.summary)
               .then(function(response) {
                 console.log(response);
                 if (response == 'Success') {
                   order.type = null;
                   order.size = null;
                   order.color1 = null;
                   order.color2 = null;
                   order.selection1 = null;
                   order.selection2 = null;
                   order.name = null;
                   order.email = null;
                   order.gifted = 'unchecked';
                   order.giftInfo = null;
                   order.resident = null;
                   order.comments = null;
                   order.submitted = false;
                 } else {
                   console.log('Error', response);
                 }
               });

  };

  order.total = function() {
    var total = 0;
    if (order.type == 'Stork Blanknit') {
      switch (order.size) {
        case 'Extra Small (car-seat) Stork':
          total = 100;
          break;
        case 'Small (crib-size) Stork':
          total = 150;
          break;
        case 'Medium Stork':
          total = 175;
          break;
        case 'Large Stork':
          total = 190;
          break;
        default:
          total = 0;
      }
    } else if (order.type == 'Lamb Blanknit') {
      switch (order.size) {
        case 'Extra Small (car-seat) Lamb':
          total = 230;
          break;
        case 'Small (crib-size) Lamb':
          total = 350;
          break;
        case 'Medium Lamb':
          total = 385;
          break;
        case 'Large Lamb':
          total = 400;
          break;
        default:
          total = 0;
      }
    }
    if (order.resident) {
      total = total * 1.06701;
    }
    return total;
  };

  // Disable color selection for lamb blankets, remove images
  order.resetColors = function() {
    if (order.type == 'Lamb Blanknit') {
      order.selection1 = "";
      order.selection2 = "";
      order.color1 = "";
      order.color2 = "";
      order.showColorSelection = '';
    }
    if (order.type == 'Stork Blanknit') {
      order.showColorSelection = 'space';
    }
    order.changeOptions();
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
