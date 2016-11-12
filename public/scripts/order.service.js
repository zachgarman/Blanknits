angular.module('blankApp')
       .service('OrderService', OrderService);


function OrderService($http) {
  this.sendSummary = function(formData) {
      console.log('OrderService: ',formData);
      return $http.post('/orderRouter', formData)
        .then(function() {
          return 'Success';
        }, function(error) {
          console.log('Error', error);
          return error;
        });
  };
}
