angular.module('blankApp')
       .controller('AdminController', AdminController);

function AdminController(Upload) {
  console.log('AdminController loaded.');

  var admin = this;

  admin.uploadPicture = function() {
    console.log('In controller, admin.upload.file: ', admin.upload.file);
    Upload.upload({
      url: '/blankGallery',
      method: 'POST',
      data: admin.upload,
    });
  };

}
