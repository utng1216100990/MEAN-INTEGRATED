const { Schema, model } = require('mongoose');

const orderSchema = new Schema({
    type: { type: String, required: true },
    name: { type: String, required: true },
    price: { type: Number, required: true },
    quantity: { type: Number, required: true },
});

module.exports = model('Order', orderSchema);