// models/Cart.js

const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
    userId: String,
    products: [{ productId: String, quantity: Number }]
});

const Cart = mongoose.model('Cart', cartSchema);

module.exports = Cart;
