const router = require('express').Router();
var client = require('braintree-web/client');
var paypal = require('braintree-web/paypal');

// client.create({
//   authorization: 'CLIENT_TOKEN_FROM_SERVER'
// }, function (err, clientInstance) {
// // Create PayPal component
//   paypal.create({
//     client: clientInstance,
// }, function (err, paypalInstance) {
//   paypalButton.addEventListener('')
// });


module.exports = router;
