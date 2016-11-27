const router = require('express').Router();

router.get('/', function(req, res) {
  res.redirect('/admin/home');
});

module.exports = router;
