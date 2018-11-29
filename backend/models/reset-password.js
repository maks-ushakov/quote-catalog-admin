/**
 * @file reset-password
 * @description MODEL DEFINITION FOR RESET PASSWORD
 */
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// defining schema
const ResetPasswordSchema = new Schema({
    email: {
        type: String,
        required: true
    },
    token: {
        type: String,
        required: true
    }
});

// exporting the model
module.exports = mongoose.model("ResetPassword", ResetPasswordSchema);