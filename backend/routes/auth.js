/**
 * @file auth.js
 * @description API ENDPOINT TO DEAL WITH AUTHOR AUTHENTICATION
 */
const router = require("express").Router();
const Author = require("../models/author");
const hasher = require("crypto");
const ResetPassword = require("../models/reset-password");

// router to login the user
router.post("/login", (req, res) => {
    if (req.session.user) {
        // send 404 if logged in
        res.status(404).json({
            success: false,
            verbose: "Not Found"
        });
    } else {
        // not logged - validate and send response
        if (!req.body.email || !req.body.password) {
            // invalid payload
            res.status(406).json({
                success: false,
                verbose: "All fields are mandatory"
            });
        } else {
            // valid payload
            // hasing password
            req.body.password = hasher.createHash("sha512").update(req.body.password).digest("hex");
            Author.findOne(req.body).exec((err, user) => {
                // finding unique document
                if (err) {
                    // send 503 if got some db related error
                    res.status(503).json({
                        success: false,
                        verbose: "Something went wrong"
                    });
                } else if (!user) {
                    // send 404 if no user found
                    res.status(404).json({
                        success: false,
                        verbose: "Wrong email/password"
                    });
                } else {
                    // send 200 and document if user found
                    req.session.user = user._id; // setting session
                    res.json({
                        success: true,
                        verbose: "Logged In"
                    });
                }
            });
        }
    }
});

// router to logout the user
router.get("/logout", (req, res) => {
    if (req.session.user) {
        // send 404 if not logged in
        res.status(404).json({
            success: false,
            verbose: "Not Found"
        });
    } else {
        // logout instead
        req.session.destroy(err => {
            // try destroying sessions
            if (err) {
                // send 503 if got some session destroy related error
                res.status(503).json({
                    success: false,
                    verbose: "Something went wrong"
                });
            } else {
                // send 200 if deleted session and logged out success fully
                res.json({
                    success: true,
                    verbose: "Logged Out"
                });
            }
        });
    }
});

// adding router to send reset password
router.post("/reset-password", (req, res) => {
    if (req.session.user) {
        // send 404 if not logged in
        res.status(404).json({
            status: false,
            verbose: "Not Founf"
        });
    } else {
        // find and send reset link to mail
        Author.findOne(req.body).exec((err, author) => {
            if (err) {
                // send 503 if error while dealing with mongodb
                res.status(503).json({
                    success: false,
                    verbose: "Something went wrong"
                });
            } else if (!author) {
                // send 404 if no author found
                res.status(503).json({
                    success: false,
                    verbose: `Email '${req.body.email}' not found`
                });
            } else {
                // send success
                res.json({
                    success: true,
                    verbose: `Email sent to ${req.body.email}`
                });
            }
        });
    }
});

// adding router check token availability
router.get("/restore-password", (req, res) => {
    if (req.session.user) {
        // send 404 if logged in
        res.status(404).json({
            status: false,
            verbose: "Not Found"
        });
    } else {
        // send non 404 otherwise
        ResetPassword.findOne(req.body).exec((err, doc) => {
            if (err) { // send 503 if error while dealing with db
                res.status(503).json({
                    success: false,
                    verbose: "Something went wrong"
                });
            } else if (!doc) { // no request for reset password found for token
                res.status(404).json({
                    success: false,
                    verbose: "Not Found"
                });
            } else { // send success
                res.json({
                    status: true,
                    verbose: "Reset Password Request Found"
                });
            }
        });
    }
});

// adding router to restore password
router.post("/restore-password/:token", (req, res) => {
    if (req.session.user) { // send 404 if logged in
        res.status(404).json();
    } else { // find restore and send resposne
        ResetPassword.findOneAndDelete({
            token: req.params.token
        }).exec((err, doc) => { // send 503 if error in db
            if (err) {
                res.status(503).json({
                    status: false,
                    verbose: "Something went wrong"
                });
            } else if (!doc) { // no request for reset password found for token
                res.status(404).json({
                    success: false,
                    verbose: "Not Found"
                });
            } else { // update
                req.body.password = hasher.createHash("sha512").update(req.body.password).digest("hex");
                Author.findOneAndUpdate({
                    email: doc.email
                }, req.body).exec((err) => {
                    if (err) { // send 503 if error related to db
                        res.status(503).json({
                            success: false,
                            verbose: "Something went wrong"
                        });
                    } else { // send success otherwise
                        res.json({
                            success: true,
                            verbose: "Password changed successfully"
                        });
                    }
                });
            }
        });
    }
});
module.exports = router;