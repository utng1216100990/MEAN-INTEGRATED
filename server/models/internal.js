const { Schema, model } = require('mongoose');

const InternalSchema = new Schema({
    type: { type: String, required: true },
    responsible: { type: String, required: true }, 
    amount: { type: Number, required: true },
    reason: { type: String, required: true }
});

module.exports = model('Internal', InternalSchema);