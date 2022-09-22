const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
    name: { type: String, required: true }, // String is shorthand for {type: String}
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    balance: { type: Number, required: true, min: 0, default: 0 }
}, { timestamps: true });

const User = mongoose.model('User', userSchema);

module.exports = { userSchema, User };

