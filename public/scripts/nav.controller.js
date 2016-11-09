angular.module('blankApp')
       .controller('NavController', NavController);

function NavController() {
  console.log('NavController loaded.');

  var nav = this;

  nav.showMenu = false;
  nav.showProductDropdown = false;

  nav.showDropdown = function() {
    nav.showMenu = !nav.showMenu;
  };

  nav.showProductLinks = function() {
    nav.showProductDropdown = !nav.showProductDropdown;
  };

}
