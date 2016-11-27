const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const galleryRouter = require('./routes/galleryRouter');
const emailRouter = require('./routes/emailRouter');
const orderRouter = require('./routes/orderRouter');
// const passport = require('passport');
// const session = require('express-session');
// const LocalStrategy = require('passport-local').Strategy;
// const basicAuth = require('basic-auth');
const admin = require('./routes/adminRouter');

const app = express();

var username = process.env.username;
var password = process.env.password;


// middleware
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(express.static('public'));

//routers
app.use('/blankGallery', galleryRouter);
app.use('/emailRouter', emailRouter);
app.use('/orderRouter', orderRouter);

app.get('/*', function(req, res) {
  res.sendFile(path.join(__dirname, 'public/views/index.html'))
});

const port = process.env.PORT || 3000;

var server = app.listen(port, function() {
  console.log('Listening on PORT: ', server.address().port);
});
