angular.module('blankApp')
       .controller('AdminController', AdminController);

function AdminController(Upload, PictureService, $timeout) {
  console.log('AdminController loaded.');

  var admin = this;

  admin.uploadPicture = function(form) {
    if (form.$invalid) {
      return;
    }
    admin.progress = true;
    $timeout(function() {
      PictureService.newName(admin.upload);
      admin.progress = false;
      admin.upload = {};
      admin.success = true;
    }, 5000);
    $timeout(function() {
      admin.upload = {};
      admin.success = false;
    }, 7000);
    Upload.upload({
      url: '/blankGallery',
      method: 'POST',
      data: admin.upload,
    });
  };

}
