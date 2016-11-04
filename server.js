const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const galleryRouter = require('./routes/galleryRouter');

const app = express();

// middleware
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(express.static('public'));

app.use('/blankGallery', galleryRouter);

app.get('/*', function(req, res) {
  res.sendFile(path.join(__dirname, 'public/views/index.html'))
});

const port = process.env.PORT || 3000;

var server = app.listen(port, function() {
  console.log('Listening on PORT: ', server.address().port);
});
