const router = require('express').Router();
const nodemailer = require('nodemailer');
const smtpTransport = require('nodemailer-smtp-transport');

router.post('/', function(req, res) {
  console.log('made it to the email router', req.body);

  // creates reusable transporter object using the default SMTP transport
  var transporter = nodemailer.createTransport(smtpTransport({
    host: "smtp.gmail.com",
    secureConnection: false,
    port:587,
    auth: {
      user: "margee@blanknits.com",
      pass: "blankn1ts4u!"
    }
  }));
  var name = req.body.name;
  var email = req.body.email;
  var phone = req.body.phoneNumber || 'Not Provided';
  var comments = req.body.comments;

  var mailOptions = {
      from: '"blanknits.com ?" <blanknits.com>', // sender address
      to: 'margee@blanknits.com', // list of receivers
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
