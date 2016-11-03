const router = require('express').Router();
const pg = require('pg');
const AWS = require('aws-sdk');

AWS.config.loadFromPath('./config.json');

var s3 = new AWS.S3();

router.get('/', function(req, res) {
  console.log('got a request to router');

  // var params = {Bucket:'blanknits', Key: 'home-image.jpg'};
  //
  // s3.getSignedUrl('getObject', params, function(err, url) {
  //   if (err) {
  //     console.log('Error querying S3: ', err);
  //     res.sendStatus(500);
  //   } else {
  //     console.log('Url received from S3: ', url);
  //     res.send(url);
  //   }
  // });

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
