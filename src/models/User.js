const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 30,
    },
    login: {
        type: String,
        required: true,
        unique: true,
        minlength: 3,
        maxlength: 30,
        match: /^[A-Za-z0-9]+$/,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: /^\S+@\S+\.\S+$/,
    },
    phone: {
        type: String,
        required: true,
        unique: true,
        match: /^\+380\d{9}$/,
    },
    password: {
        type: String,
        required: true,
    },
});

const User = mongoose.model('User', userSchema);

module.exports = User;