angular.module('blankApp')
       .controller('LoginController', LoginController);

function LoginController($http) {
  console.log('LoginController loaded.');
  var login = this;

  login.login = function() {
    console.log('Login pressed\n Username: ' + login.data.username + '\nPassword: ' +
                login.data.password);
    $http.post('/admin/home', login.data);
  };


}
