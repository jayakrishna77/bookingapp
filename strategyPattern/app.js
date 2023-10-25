const Payment = require('./payment');
const Chase = require('./Chase');
const Citibank = require('./Citibank');

const payment = new Payment();

payment.pay(new Chase(200, '1234567'));
payment.refund(new Chase(50, '1234567'));
payment.pay(new Citibank(200, '487t87'));
payment.refund(new Citibank(200, '487t87'));