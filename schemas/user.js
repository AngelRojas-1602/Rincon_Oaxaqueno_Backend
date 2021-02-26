const { Schema, model } = require('mongoose');

const UserSchema = new Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    name: { type: String, required: true },
    role: { type: String, required: true, enum: ['ADMIN', 'USER'] },
    cart: [{ type: Schema.Types.ObjectId, ref: 'product' }]
}, { timestamps: true });

module.exports = model('user', UserSchema);