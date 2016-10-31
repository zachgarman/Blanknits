angular.module('blankApp')
       .controller('NavController', NavController);

function NavController() {
  console.log('Controller works!');

  var nav = this;

  nav.show = false;

  nav.showDropdown = function() {
    nav.show = !nav.show;
  };

}
