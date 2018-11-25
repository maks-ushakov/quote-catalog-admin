const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");

// creating express app
const app = express();

// adding middlewares
if (process.env.NODE_ENV == "development") {
    app.use(require("morgan")("dev"));
} else {
    app.use(require("morgan")("combined"));
}
app.use(bodyParser.json());
app.use(express.static(path.resolve(path.join(__dirname, '../dist'))));

// managing routes
app.use("/api/user", require("./routes/users"));

// handling 404
app.get("*", (req, res) => {
    res.sendFile(path.resolve(path.join(__dirname, '../dist/index.html')));
});

// configuring port
const port = process.env.PORT != undefined ? parseInt(process.env.PORT) : 3000;

// starting server
app.listen(port, () => {
    console.clear();
    console.log("Server running at http://localhost:%d", port);
    console.log("NodeJS Environment", process.env.NODE_ENV);
});