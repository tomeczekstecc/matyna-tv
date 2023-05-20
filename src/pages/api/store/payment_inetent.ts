// This is your test secret API key.
const stripe = require("stripe")('sk_test_51N9D7lGv4q4YodSWNt2IOP5YJa7A4yJU3eX1str1BIfYVKrrAxEn8c8Agjs4kbcQSzR4GbRZz0qMAPmQsFmBBHgr00NytQu5GZ');

const calculateOrderAmount = (items) => {
  // Replace this constant with a calculation of the order's amount
  // Calculate the order total on the server to prevent
  // people from directly manipulating the amount on the client
  return 1400;
};

export default async function handler(req, res) {
  const { items } = req.body;

  // Create a PaymentIntent with the order amount and currency
  const paymentIntent = await stripe.paymentIntents.create({
    amount: calculateOrderAmount(items),
    currency: "PLN",
    automatic_payment_methods: {
      enabled: true,
    },
  });

  res.send({
    clientSecret: paymentIntent.client_secret,
  });
};
