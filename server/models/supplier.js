const { Schema, model } = require('mongoose');

const SupplierSchema = new Schema({
    companyName: { type: String, required: true },
    contactName: { type: String, required: true },
    address: { type: String, required: true },
    city: { type: String, require: true },
    phone: { type: Number, required: true }
});

module.exports = model('Supplier', SupplierSchema);