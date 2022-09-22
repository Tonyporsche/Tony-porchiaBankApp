const mongoose = require('mongoose');
const { Schema } = mongoose;

const transactionSchema = new Schema({
    amount: { type: Number, required: true, min: 0 },
    type: { type: String, required: true, enum: ['deposit', 'withdraw'] },
    previousBalance: { type: Number, required: true, min: 0 },
    afterBalance: { type: Number, required: true, min: 0 },
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true }
}, { timestamps: true });

const Transaction = mongoose.model('Transaction', transactionSchema);

module.exports = { transactionSchema, Transaction };

