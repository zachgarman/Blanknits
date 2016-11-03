const router = require('express').Router();
const pg = require('pg');
const AWS = require('aws-sdk');
require('dotenv').config({path: './aws.env'});


AWS.config.update({
  accessKeyId: process.env.accessKeyId,
  secretAccessKey: process.env.secretAccessKey,
  region: 'us-west-2',
});

var params = {
  Bucket: 'blanknits',
  Key: 'blanknits/'
};

var s3bucket = new AWS.S3({params: {Bucket: 'blanknits'}, apiVersion: '2006-03-01' });

router.get('/', function(req, res) {
  console.log('got a request to router');

  s3bucket.getObject({Key: 'home/home-image.jpg'}, function(err, data) {
    if (err) {
      console.log('Error querying S3: ', err);
      res.sendStatus(500);
    } else {
      console.log('Data received from S3: ', data);
      res.send(data);
    }
  });


});

module.exports = router;
