const mongoose = require ('mongoose');
const { Schema } = mongoose;

const ExternalSchema = new Schema({
    reason: { type: String, required: true },
    cost: { type: Number, required: true },
});

module.exports = mongoose.model('External', ExternalSchema);