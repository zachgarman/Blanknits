angular.module('blankApp')
       .service('FormService', FormService);


function FormService($http) {
  this.sendRequest = function(formData) {
      console.log('FormService: ',formData);
      return $http.post('/emailRouter', formData)
        .then(function() {
          return 'Success';
        });
  };
}
