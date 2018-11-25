/**
 * @file quote.js
 * @description MongoDB Schema for Quotes
 */
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// defining schema
const QuoteSchema = new Schema({
    text: {
        type: String,
        required: true
    },
    postedOn: {
        type: Date,
        default: Date.now()
    },
    edited: {
        type: Date,
        default: Date.now()
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: "User"
    }
});

// creating model and exporting
module.exports = mongoose.model("Quote", QuoteSchema);