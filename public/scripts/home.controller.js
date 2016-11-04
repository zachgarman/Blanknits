angular.module('blankApp')
       .controller('HomeController', HomeController);

function HomeController(PictureService, FormService) {
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
      params : {
        'callback' : 'JSON_CALLBACK',
        'name' : home.name,
        'email' : home.email,
        'phoneNumber' : home.phoneNumber,
        'comments' : home.comments
      },
    };

    console.log(formData);

    FormService.sendRequest(formData)
               .then(function(response) {
                 console.log(response);
                 home.name = null;
                 home.email = null;
                 home.phoneNumber = null;
                 home.comments = null;
                 home.messages = 'Your form has been sent!';
                 home.submitted = false;
               });
    // Track the request and show its progress to the user.
    // home.progress.addPromise($promise);
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
