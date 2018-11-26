const router = require("express").Router();
// eslint-disable-next-line
const Author = require("../models/author");
const Quote = require("../models/quote");

// router to get all 
router.get("/randon", (req, res) => {
    Quote.count().exec((err, count) => { // counting documents
        if (err) { // send 503 if error related to db
            res.status(503).json({
                success: false,
                verbose: "Something went wrong"
            });
        } else { // get random document otherwise
            const random = Math.floor(Math.random() * count); // getting random number

            Quote.findOne().populate("author").populate("postedBy").skip(random).exec((err, quote) => { // query all quotes but only fetch one offset by our random
                if (err) { // send 503 if error related to db
                    res.status(503).json({
                        success: false,
                        verbose: "Something went wrong"
                    });
                } else { // send random data
                    res.json(quote);
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
        Quote.findById(req.params.id).populate("author").populate("postedBy").exec((err, quote) => { // searching by unique id
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
    if (process.env.READ_WITHOUT_AUTH != "1" || !req.session.user) { // send 404 if not logged in or user not allowed by admin
        res.status(404).json({
            success: false,
            verbose: "Not Found"
        });
    } else { // send quotes otherwise
        Quote.find().populate("author").populate("postedBy").sort({
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

// router to update 
module.exports = router;