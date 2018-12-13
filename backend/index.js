const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const history = require("connect-history-api-fallback");

mongoose.Promise = global.Promise;

// connecting to mongoose
if (!process.env.MONGO_USER || !process.env.MONGO_PASS || !process.env.MONGO_HOST || !process.env.MONGO_DB) {
    console.error("Invalid DB Config");
    process.exit(1);
}
mongoose.connect(`mongodb://${process.env.MONGO_USER}:${process.env.MONGO_PASS}@${process.env.MONGO_HOST}/${process.env.MONGO_DB}`, {
    useNewUrlParser: true,
    useCreateIndex: true
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
app.use(express.static(path.resolve(path.join(__dirname, '../public'))));
app.use(bodyParser.json());
app.use(cors());
app.use(cookieParser());
app.use(session({
    cookie: {
        secure: false,
        maxAge: 864000000
    },
    saveUninitialized: true,
    resave: false,
    secret: "va3QFZFbxvvjd",
    name: "Quote-Catalog",
}))
// managing routes
app.use("/api/auth", require("./routes/auth"));
app.use("/api/quotes", require("./routes/quotes"));
app.use("/api/author", require("./routes/author"));

app.use(history({
    index: path.resolve(path.join(__dirname, '../public'))
}));
app.use(express.static(path.resolve(path.join(__dirname, '../public'))));

// handling 404
app.get("*", (req, res) => {
    res.sendFile(path.resolve(path.join(__dirname, '../public/index.html')));
});

// configuring port
const port = process.env.PORT != undefined ? parseInt(process.env.PORT) : 3000;

// starting server
app.listen(port, () => {
    console.clear();
    console.log("Server running at http://localhost:%d", port);
    console.log("NodeJS Environment", process.env.NODE_ENV);
});