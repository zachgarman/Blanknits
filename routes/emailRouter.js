const router = require('express').Router();
const nodemailer = require('nodemailer');
const smtpTransport = require('nodemailer-smtp-transport');
require('dotenv').config();

router.post('/', function(req, res) {
  console.log('made it to the email router', req.body);
  console.log('email', process.env.EMAIL);
  console.log('pass', process.env.EMAIL_PASS);

  // creates reusable transporter object using the default SMTP transport
  // var transporter = nodemailer.createTransport(
  //   // service: 'godaddy',
  //
  //   smtpTransport({
  //   host: "smtp.gmail.com",
  //   secureConnection: false,
  //   port:587,
  //   auth: {
  //     user: process.env.EMAIL,
  //     pass: process.env.EMAIL_PASS
  //   }
  // // });
  // }));
  var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL,
      pass: process.env.EMAIL_PASS
    }
  });
  var name = req.body.name;
  var email = req.body.email;
  var phone = req.body.phoneNumber || 'Not Provided';
  var comments = req.body.comments;

  var mailOptions = {
      from: '"blanknits.com ?" <blanknits.com>', // sender address
      to: process.env.EMAIL, // list of receivers
      subject: 'Information requested', // Subject line
      text: 'Name:  ' + name + '\n\nEmail:  ' + email + '\n\nPhone:  ' +
            phone + '\n\nComments:  ' + comments,
  };


  // send mail with defined transport object
  transporter.sendMail(mailOptions, function(error, response) {
    // email did not send
    if(error){
      console.log('Error sending email: ', error);
      res.sendStatus(500);
    } else {
      console.log('Message sent: ', response);
      res.sendStatus(200);
    }
  });
});

module.exports = router;
