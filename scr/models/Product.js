// models/Product.js
const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    title: String,
    description: String,
    price: Number,
    // Otros campos
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
