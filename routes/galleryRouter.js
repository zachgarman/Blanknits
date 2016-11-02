const router = require('express').Router();
const pg = require('pg');

const config = {};

router.get('/', function(req, res) {
  console.log('got a request to router');

  var response = {
    data: 'You made a request!',
  };

  res.send(response);
});

module.exports = router;
