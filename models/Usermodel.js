const mongoose = require('mongoose');  // Correctly import mongoose

const { Schema } = mongoose;  // Destructure Schema from mongoose

const UserSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true
    }
});

const User = mongoose.model('User', UserSchema);  // Create the model

module.exports = User;  // Export the model
