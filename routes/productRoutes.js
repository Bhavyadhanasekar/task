
const express = require('express');
const { addToCart, getCartItems, removeFromCart, purchaseItems } = require('../controllers/productController');
const router = express.Router();

router.post('/add', addToCart);
router.get('/', getCartItems);
router.delete('/remove/:id', removeFromCart);
router.post('/purchase', purchaseItems);

module.exports = router;
