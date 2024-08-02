const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { connectDB } = require('./config/db');
const productRoutes = require('./routes/productRoutes');
const stripe = require('stripe')('123485764332'); 

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Database connection
connectDB();

// Routes
app.use('/api/products', productRoutes);


app.post('/api/create-payment-intent', async (req, res) => {
  const { cartItems } = req.body;

  const totalAmount = cartItems.reduce((acc, item) => acc + item.price, 0) * 100; 

  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: totalAmount,
      currency: 'usd',
    });

    res.status(200).send({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
