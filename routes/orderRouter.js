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
      user: "zachgarman2@gmail.com",
      pass: "blanknits"
    }
  }));
  var name = req.body.name;
  var email = req.body.email;
  var type = req.body.type;
  var size = req.body.size;
  var color1 = req.body.color1;
  var color2 = req.body.color2;
  var giftee = req.body.giftee;
  var residentAZ = req.body.resident;
  var comments = req.body.comments;
  var total = req.body.total;

  var mailOptions = {
      from: '"blanknits.com ?" <blanknits.com>', // sender address
      to: 'zachgarman2@gmail.com', // list of receivers
      subject: 'Information requested', // Subject line
      text: 'Hi, Margee. A purchase was attempted for Blanknits. check your ' +
            'PayPal account to ensure it succeeded.  Here are the details: ' +
            'Name:  ' + name + '\n\nEmail:  ' + email + '\n\nType:  ' +
            type + '\n\nSize:  ' + size + '\n\nColor 1:  ' + color1 +
            '\n\nColor 2:  ' + color2 + '\n\nGiftee\'s name:  ' + giftee +
            '\n\nResident of AZ?:  ' + residentAZ + '\n\nOrder Total:  ' + total +
            '\n\nCustomer Comments:  ' + comments,
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
