angular.module('blankApp')
       .controller('HomeController', HomeController);

function HomeController(PictureService, FormService, $timeout) {
  console.log('HomeController loaded.');

  var home = this;

  home.submit = function(form) {
    // Trigger validation flag.
    home.submitted = true;
    // If form is invalid, return and show validation errors.
    if (form.$invalid) {
      return;
    }

    // Default values for the request.
    var formData = {
      'name' : home.name,
      'email' : home.email,
      'phoneNumber' : home.phoneNumber,
      'comments' : home.comments
    };

    console.log(formData);

    FormService.sendRequest(formData)
               .then(function(response) {
                 console.log(response);
                 if (response == 'Success') {
                   home.name = null;
                   home.email = null;
                   home.phoneNumber = null;
                   home.comments = null;
                   home.messages = 'Your form has been sent!';
                   home.submitted = false;
                   $timeout(function() {
                     home.messages = '';
                   }, 3000);
                 }
               });

  };


  home.getHomeImage = function () {
    PictureService.getHomeImage()
                  .then(function(response) {
                    home.homeImageUrl = response;
                  });
  };
  home.getHomeImage();
}
