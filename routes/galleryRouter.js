const router = require('express').Router();
const pg = require('pg');
const AWS = require('aws-sdk');
require('dotenv').config({path: './aws.env'});


AWS.config.update({
  accessKeyId: process.env.accessKeyId,
  secretAccessKey: process.env.secretAccessKey,
  region: 'us-west-2',
});

var s3 = new AWS.S3();

router.get('/', function(req, res) {
  console.log('got a request to router');

  var params = {
    Bucket: 'blanknits',
    Key: 'blanknits/'
  };
  s3.getObject(params, function(err, data) {
    if (err) {
      console.log('Error: ', err);
    } else {
      console.log('Data: ', data);
    }
  });


});

module.exports = router;
