const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    cartItems: [{
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'CartItem', 
        required: true
    }],
    totalPrice: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        enum: ['success', 'failed'],
        required: true
    }
}, { timestamps: true }); 

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
