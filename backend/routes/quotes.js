/**
 * @file quotes.js
 * @description API ENDPOINT TO DEAL WITH QUOTES
 */
const router = require("express").Router();
// eslint-disable-next-line
const Author = require("../models/author");
const Quote = require("../models/quote");

// router to get all 
router.get("/random", (req, res) => {
    Quote.estimatedDocumentCount().exec((err, count) => { // counting documents
        if (err) { // send 503 if error related to db
            res.status(503).json({
                success: false,
                verbose: "Something went wrong",
                message: err.message
            });
        } else { // get random document otherwise
            const random = Math.floor(Math.random() * count); // getting random number

            Quote.findOne().populate("postedBy").skip(random).exec((err, quote) => { // query all quotes but only fetch one offset by our random
                if (err) { // send 503 if error related to db
                    res.status(503).json({
                        success: false,
                        verbose: "Something went wrong"
                    });
                } else if (!quote) { // send 404 if no quotes uploaded
                    res.status(404).json({
                        status: false,
                        verbose: "Not Found"
                    });
                } else { // send random quote
                    res.json({
                        status: true,
                        verbose: "Found",
                        quote: quote
                    });
                }
            });
        }
    });
});

// router to get quote by ID
router.get("/:id", (req, res) => {
    if (!req.params.id) { // send 406 if no id is passed
        res.status(406).json({
            success: false,
            verbose: "No quote id is passed"
        });
    } else { // search and send quote
        Quote.findById(req.params.id).populate("postedBy").exec((err, quote) => { // searching by unique id
            if (err) { // send 503 if error related to db
                res.status(503).json({
                    success: false,
                    verbose: "Something went wrong"
                });
            } else if (!quote) { // send 404 if qoute not found or id is wrong
                res.status(404).json({
                    success: false,
                    verbose: "Not Found"
                });
            } else { // send matched document
                res.json({
                    success: true,
                    verbose: "Found",
                    quote: quote
                });
            }
        });
    }
});

// router to get all quotes
router.get("/", (req, res) => {
    if (process.env.READ_WITHOUT_AUTH != "1" && !req.session.user) { // send 404 if not logged in or user not allowed by admin
        res.status(404).json({
            success: false,
            verbose: "Not Found"
        });
    } else { // send quotes otherwise
        Quote.find().populate("postedBy").sort({
            postedOn: "desc"
        }).exec((err, qoutes) => {
            if (err) { // send 503 if error related to db
                res.status(503).json({
                    success: false,
                    verbose: "Something went wrong"
                });
            } else { // send qoutes otherwise
                res.json({
                    success: true,
                    verbose: "Found",
                    quotes: qoutes
                });
            }
        });
    }
});

// router to create new route 
router.post("/", (req, res) => {
    if (process.env.ACCESS_WITHOUT_AUTH != "1" && !req.session.user) { 
        // send 405 if not logged in
        res.status(405).json({
            status: false,
            verbose: "Login to add quotes"
        });

    } else { 
        // validate and add quote
        if (!req.body.text) {
            res.status(406).json({
                success: false,
                verbose: "Invalid input. Text is required"
            });
        } else {
            // add quote
            if (!req.body.author) {
                req.body.author = "Unknown"
            }
            
            req.body.postedBy = req.session.user;
            const quote = new Quote(req.body);
            // update quotes in Author model
            quote.save((err) => { //saving newly created document
                if (err) { // send 503 if error in db operation
                    res.status(503).json({
                        success: false,
                        verbose: "Something went wrong"
                    });
                } else { // send success otherwise
                    res.json({
                        success: true,
                        verbose: "Successfully added"
                    });
                }
            })
        }

    }
});

// router to delete quote
router.delete("/:id", (req, res) => {
    if (process.env.ACCESS_WITHOUT_AUTH != "1" && !req.session.user) { // send 405 if not logged in
        res.status(405).json({
            status: false,
            verbose: "Login to delete quotes"
        });
    } else if (!req.params.id) { // send 404 if no id passed
        res.status(404).json({
            status: false,
            verbose: "Not found"
        });
    } else { // delete quote
        // delete quote use findByID instead because we have to use _id (uuid field)

        Quote.findByIdAndDelete(req.params.id).exec((err) => {
            if (err) { // send 503 if error in db operation
                res.status(503).json({
                    success: false,
                    verbose: "Something went wrong"
                });
            } else { // send success
                res.json({
                    success: true,
                    verbose: "Deleted"
                });
            }
        });

        // delete from Authors collection too
    }
});

// router to update quote
router.put("/:id", (req, res) => {
    if (process.env.ACCESS_WITHOUT_AUTH != "1" && !req.session.user) { // send 405 if not logged in
        res.status(405).json({
            status: false,
            verbose: "Login to update quotes"
        });
    } else if (!req.params.id) { // send 404 if no id passed
        res.status(404).json({
            status: false,
            verbose: "Not found"
        });
    } else { // update quote
        // update quote use findByID instead because we have to use _id (uuid field)
        req.body.edited = Date.now();

        Quote.findByIdAndUpdate(req.params.id, req.body).exec((err) => {
            if (err) { // send 503 if error in db operation
                res.status(503).json({
                    success: false,
                    verbose: "Something went wrong"
                });
            } else { // send success
                res.json({
                    success: true,
                    verbose: "Updated"
                });
            }
        });
    }
});
module.exports = router;