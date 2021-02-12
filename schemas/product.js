const { Schema, model } = require('mongoose');

const ProductSchema = new Schema({
    name: { type: String, required: true },
    price: { type: Number, min: 0, required: true },
    description: { type: String, required: true },
    sku: { type: String, unique: true },
    stock: { type: Number, required: true, min: 0 },
    picture: { type: String, required: true }
}, { timestamps: true });

module.exports = model('product', ProductSchema);