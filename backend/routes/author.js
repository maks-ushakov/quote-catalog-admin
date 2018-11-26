/**
 * @file author.js
 * @description API ENDPOINT TO DEAL WITH AUTHOURS
 */
const router = require("express").Router();
const Author = require("../models/author");
const hasher = require("crypto");

// router to get author by id
router.get("/:id", (req, res) => {
    if (!req.session.user) { // send 405 if not logged in
        res.status(405).json({
            success: false,
            verbose: "Login to view profile"
        });
    } else if (!req.params.id) { // send 406 if no id passed
        res.status(406).json({
            success: false,
            verbose: "No id passed"
        });
    } else { // find and send valid response otherwise
        Author.findOne({ // finding one document with id passed in parameter
            id: req.params.id
        }).populate("quotes").exec((err, author) => {
            if (err) { // send 503 if error in db operation
                res.send(503).json({
                    success: false,
                    verbose: "Something went wrong"
                });
            } else if (!author) { // send 404 if no author found
                res.status(404).json({
                    success: false,
                    verbose: "Author not found"
                });
            } else { // send the author details
                res.json({
                    success: true,
                    verbose: "Fuund document",
                    author: author
                });
            }
        });
    }
});

// router to register new author
router.post("/register", (req, res) => {
    if (req.session.user) { // send 404 if already logged in
        res.status(404).json({
            success: false,
            verbose: "Not Found"
        });
    } else { // validate and add new author
        if (!req.body.email || !/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(req.body.email) ||
            !req.body.password || !req.body.id || !req.body.name) { // send 406 if invalid input
            res.status(406).json({
                success: true,
                verbose: "Invalid input"
            });
        } else { // hash password and save
            req.body.password = hasher.createHash("sha512").update(req.body.password).digest("hex");
            const author = new Author(req.body);
            author.save((err) => { //saving newly created document
                if (err) { // send 503 if error in db operation
                    res.status(503).json({
                        success: false,
                        verbose: "Something went wrong"
                    });
                } else { // send success otherwise
                    res.json({
                        success: true,
                        verbose: "Successfully registered"
                    });
                }
            });
        }
    }
});
module.exports = router;