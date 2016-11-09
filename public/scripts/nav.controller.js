angular.module('blankApp')
       .controller('NavController', NavController);

function NavController() {
  console.log('NavController loaded.');

  var nav = this;
  // Initially, do not show menu for small screens
  nav.showMenu = false;
  // On click, toggle ng-show for menu on small screens
  nav.showDropdown = function() {
    nav.showMenu = !nav.showMenu;
  };

  // JS for showing/hiding dropdown menu on Products li
  nav.showProductDropdown = false;

  nav.showProductLinks = function() {
    nav.showProductDropdown = !nav.showProductDropdown;
  };

  // JS for showing/hiding dropdown menu on Gallery li
  nav.showGalleryDropdown = false;

  nav.showGalleryLinks = function() {
    nav.showGalleryDropdown = !nav.showGalleryDropdown;
  };

}
