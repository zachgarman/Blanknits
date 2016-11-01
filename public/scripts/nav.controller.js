angular.module('blankApp')
       .controller('NavController', NavController);

function NavController() {
  console.log('NavController works!');

  var nav = this;

  nav.show = false;

  nav.showDropdown = function() {
    nav.show = !nav.show;
  };

}
