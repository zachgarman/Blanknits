const router = require('express').Router();
// const pg = require('pg');
const AWS = require('aws-sdk');

// AWS.config.loadFromPath('./config.json');

var s3 = new AWS.S3();

router.get('/home', function(req, res) {
  var params = {Bucket: 'blanknits-home'};
  var homeUrl = {};

  s3.listObjects(params, function(err, data) {
    if (err) {
      console.log('Error querying S3', err);
    } else {
      var bucketContents = data.Contents;
      console.log(data.Contents);

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

router.get('/', function(req, res) {
  console.log('got a request to router');

  var params = {Bucket: 'blanknits-images'};
  var urls = [];
  s3.listObjects(params, function(err, data) {
    if (err) {
      console.log('Error querying S3', err);
    } else {
      var bucketContents = data.Contents;
      console.log(data.Contents);
      for (var i = 0; i < bucketContents.length; i++) {
        var urlParams = {Bucket: 'blanknits-images', Key: bucketContents[i].Key};
        s3.getSignedUrl('getObject', urlParams, function(err, url) {
          urls.push({url: url});
        });
      }
      res.send(urls);
    }
  });

});

module.exports = router;
