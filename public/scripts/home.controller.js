angular.module('blankApp')
       .controller('HomeController', HomeController);

function HomeController() {
  console.log('HomeController works!');

  var home = this;

  // Handle home screen 'request for more info' form.
  home.requestInfo = function() {
    var contact = {
      name: home.name,
      email: home.email,
      phoneNumber: home.phoneNumber,
      message: home.message,
    };
    // Send info in an email and as a post req to admin bucket
    console.log(contact);
    home.name = '';
    home.email = '';
    home.phoneNumber = '';
    home.message = '';
  };
}
