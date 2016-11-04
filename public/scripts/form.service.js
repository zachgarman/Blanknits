angular.module('blankApp')
       .service('FormService', FormService);

function FormService($http) {

  this.sendRequest = function(config) {
    // Perform JSONP request.
    // var $promise = $http.jsonp('response.json', config)
    //   .success(function(data, status, headers, config) {
    //     if (data.status == 'OK') {
    //
    //     } else {
    //       home.messages = 'Oops, we received your request, but there was an error processing it.';
    //     }
    //   })
    //   .error(function(data, status, headers, config) {
    //     home.progress = data;
    //     home.messages = 'There was a network error. Try again later.';
    //   })
    //   .finally(function() {
    //     // Hide status messages after three seconds.
    //     timeout(function() {
    //       home.messages = null;
    //     }, 3000);
    //   });
    return 'Sent!';

  };

}
