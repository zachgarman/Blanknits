angular.module('blankApp')
       .controller('AboutController', AboutController);

function AboutController () {
  console.log('AboutController loaded.');

  var about = this;

  about.setClass = function(index) {
    console.log('clicked ', index);
    if (about.sizeClass[index] == 'enlarge-example') {
      about.sizeClass[index] = '';
    } else {
      about.sizeClass[index] = 'enlarge-example';
    }
  };
}
