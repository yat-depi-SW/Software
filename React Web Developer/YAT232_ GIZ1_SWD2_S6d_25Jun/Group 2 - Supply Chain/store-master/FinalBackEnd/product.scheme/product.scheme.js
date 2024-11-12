const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    title: { type: String, required: true, minlength: 3 },
    content: { type: String, required: true },
    price: { type: Number, required: true, min: 0 },
    category: { type: String, required: true },
    stock: { type: Number, required: true, min: 0, default: 0 },
    createdAt: { type: Date, default: Date.now } 
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
