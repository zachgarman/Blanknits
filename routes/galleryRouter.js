const router = require('express').Router();
const AWS = require('aws-sdk');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });
const multerS3 = require('multer-s3');
const path = require('path');
const q = require('q');

AWS.config.loadFromPath('./config.json');

var s3 = new AWS.S3();

var uploads3 = multer({
  storage: multerS3({
    s3: s3,
    bucket: 'blanknits-images',
    metadata: function(req, file, cb) {
      cb(null, { fieldName: file.fieldname });
    },
    key: function (req, file, cb) {
      //creates a name for the file with the file extention
      cb(null, 'uploadFile');
    },
  }),
});

router.get('/home', function(req, res) {
  var params = {Bucket: 'blanknits-home'};
  var homeUrl = {};

  s3.listObjects(params, function(err, data) {
    if (err) {
      console.log('Error querying S3', err);
      res.sendStatus(500);
    } else {
      var bucketContents = data.Contents;

      //take only the first image from this bucket.
      for (var i = 0; i < 1; i++) {
        var urlParams = {Bucket: 'blanknits-home', Key: bucketContents[i].Key};
        s3.getSignedUrl('getObject', urlParams, function(err, url) {
          homeUrl = {url: url};
        });
      }
    }
    res.send(homeUrl);
  });
});

router.get('/:bucket', function(req, res) {
  var s3Bucket = req.params.bucket;

  var params = {Bucket: s3Bucket};
  var images = [];
  s3.listObjects(params, function(err, data) {
    if (err) {
      console.log('Error querying S3', err);
      res.sendStatus(500);
    } else {
      var bucketContents = data.Contents;
      for (var i = 0; i < bucketContents.length; i++) {
        var key = bucketContents[i].Key;
        var urlParams = {Bucket: s3Bucket, Key: key};
        var keyArray = key.split('_');
        var code = keyArray[0];
        keyArray.shift();
        var name = keyArray.join(' ').replace('.jpg', '');
        s3.getSignedUrl('getObject', urlParams, function(err, url) {
          images.push({url: url, code: code, name: name});
        });
      }
      res.send(images);
    }
  });
});

// upload new image to amazon s3
router.post('/', uploads3.single('file'), function(req, res) {
  res.sendStatus(204);
});

// rename object
router.put('/', function(req, res) {
  defer = q.defer()
  var oldKey = 'uploadFile';
  var newKey = req.body.category + '_' + req.body.name + '.jpg';
  var bucket = 'blanknits-images';
  var putParams = {
    ACL: 'public-read',
    CopySource: bucket + '/uploadFile',
    Bucket: bucket,
    Key: newKey
  };
  s3.copyObject(putParams, function(err) {
    if (err) {
      defer.reject(err);
    } else {
      var deleteParams = {
        Bucket: bucket,
        Key: oldKey
      };
      s3.deleteObject(deleteParams, function(err) {
        if (err) {
          defer.reject(err);
        } else {
          defer.resolve();
        }
      });
    }
    return defer.promise
  });
});

module.exports = router;
