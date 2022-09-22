const mongoose = require('mongoose');
const { MONGODB_URL } = require('./constant');

async function connectMongo() {
    try {
        await mongoose.connect(MONGODB_URL);
        // use `await mongoose.connect('mongodb://user:password@localhost:27017/test');` if your database has auth enabled
        console.log({ message: "mongodb connected successfully" });
    } catch (e) {
        console.log({ message: 'mongodb connection failed', error: e });
    }
}

module.exports = connectMongo