const router = require('express').Router();
const pg = require('pg');
const AWS = require('aws-sdk');

AWS.config.update({
  region: 'us-east-1',
});

var s3bucket = new AWS.S3({params: {Bucket: 'blanknits', apiVersion: '2006-03-01'}});

router.get('/', function(req, res) {
  console.log('got a request to router');



  var params = {Bucket: 'blanknits', Key: 'home/home-image.jpg'};
  s3bucket.getSignedUrl('putObject', params, function(err, url) {
    if (err) {
      console.log('Error querying S3: ', err);
      res.sendStatus(500);
    } else {
      console.log('Url received from S3: ', url);

      res.send(url);
    }
  });
});

module.exports = router;
