angular.module('blankApp')
       .controller('HomeController', HomeController);

function HomeController() {
  console.log('HomeController works!');

  var home = this;

  home.requestInfo = function() {
    console.log('You clicked the Send button!');
  };

}
