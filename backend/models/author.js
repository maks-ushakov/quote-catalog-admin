/**
 * @file user.js
 * @description MongoDB Schema for Users
 */
const mongoose = require("mongoose");
const Schema = mongoose.Schema;


// defining schema
const UserSchema = new Schema({
    id: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
    },
    quotes: [{
        type: Schema.Types.ObjectId,
        ref: 'Quote'
    }],
    password: {
        type: String,
        required: true
    },
    joined: {
        type: Date,
        default: Date.now()
    }
});

// creating model and exporting
module.exports = mongoose.model("Author", UserSchema);