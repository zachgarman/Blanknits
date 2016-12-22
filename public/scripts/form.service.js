angular.module('blankApp')
       .service('FormService', FormService);


function FormService($http) {
  console.log('env vars', process.env.EMAIL);
  this.sendRequest = function(formData) {
      console.log('FormService: ',formData);
      return $http.post('/emailRouter', formData)
        .then(function() {
          return 'Success';
        }, function(error) {
          console.log('Error', error);
          return error;
        });
  };
}
