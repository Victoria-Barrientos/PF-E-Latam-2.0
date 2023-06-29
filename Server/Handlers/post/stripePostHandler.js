require('dotenv').config();
const { CLAVE_STRIPE } = process.env;

const Stripe = require("stripe");

const stripe = new Stripe("sk_test_51NMEmIAqi82qB8rdhFdmHI7JLwSpPqgGBToNlbB1X57NkDLn0uvbYlsN8LXR3wSoYSl8DHg0nxsTuxABBxxcaa3U00nNPYUfHw");

const stripeHandler = async (req, res) => {
  try {
    let { amount, currency, description,  payment_method} = req.body;
    amount = amount * 100;
    console.log(amount, currency, description, payment_method)
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency,
      description,
      payment_method
     
    });

  const confirmedPaymentIntent = await stripe.paymentIntents.confirm(paymentIntent.id);

    return res.status(200).json("El pago fue exitoso");
  } catch (error) {
    return res.status(400).json(error);
  }
};

module.exports = { stripeHandler };