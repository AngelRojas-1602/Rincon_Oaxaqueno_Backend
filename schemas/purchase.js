const { Schema, model } = require('mongoose');

const PurchaseSchema = new Schema({
    user: { type: Schema.Types.Object, ref: 'user', required: true },
    products: [{ type: Schema.Types.ObjectId, ref: 'product' }],
    amount: { type: Number, required: true, min: 0 }
}, { timestamps: true });

module.exports = model('purchase', PurchaseSchema);