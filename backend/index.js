const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

// connecting to mongoose
if (!process.env.MONGO_USER || !process.env.MONGO_PASS || !process.env.MONGO_HOST || !process.env.MONGO_DB) {
    console.error("Invalid DB Config");
    process.exit(1);
}
mongoose.connect(`mongodb://${process.env.MONGO_USER}:${process.env.MONGO_PASS}@${process.env.MONGO_HOST}/${process.env.MONGO_DB}`, {
    useNewUrlParser: true
}).then(() => {
    console.log(`${process.env.MONGO_USER}@${process.env.MONGO_HOST} Connected To DB`);
}).catch(() => {
    console.log("Error : Can't Connect To DB");
    process.exit(1);
});

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