const router = require('express').Router();
const AWS = require('aws-sdk');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });
const multerS3 = require('multer-s3');
const path = require('path');

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
      console.log('originalname: ', file.originalname);
      console.log('req.body', req.body);
      //creates a name for the file with the file extention
      cb(null, file.originalname);
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
  console.log('It worked.');
  console.log('req.body.name', req.body.name);
  console.log('req.body.category', req.body.category);
  res.sendStatus(204);
});

module.exports = router;
