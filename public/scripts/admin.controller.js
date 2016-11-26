angular.module('blankApp')
       .controller('AdminController', AdminController);

function AdminController(Upload, PictureService, $timeout) {
  console.log('AdminController loaded.');
  var admin = this;

  admin.logInfo = function() {
    console.log('log it',admin.upload.file);
  };

  admin.uploadPicture = function(form) {
    if (form.$invalid) {
      return;
    }
    admin.progress = true;

    Upload.upload({
      url: '/blankGallery',
      method: 'POST',
      data: admin.upload,
    }).then(function() {
      var str = admin.upload.file.name;
      admin.upload.extName = str.slice(str.indexOf('.') - str.length);
      PictureService.newName(admin.upload);
      admin.progress = false;
      admin.upload = {};
      admin.success = true;
      $timeout(function() {
        admin.upload = {};
        admin.success = false;
      }, 3000);
    });
  };

}
