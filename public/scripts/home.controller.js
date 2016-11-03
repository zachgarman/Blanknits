angular.module('blankApp')
       .controller('HomeController', HomeController);

function HomeController(PictureService) {
  console.log('HomeController loaded.');

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
    // Add confirmation that information was sent.
  };
  home.homeImageUrl = '';
  home.getHomeImage = function () {
    PictureService.getHomeImage()
                  .then(function(response) {
                    home.homeImageUrl = response;
                  });
  };
  home.getHomeImage();
}
// "https://s3-us-west-2.amazonaws.com/blanknits-home/home-image.jpg"
