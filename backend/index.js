const express = require('express')
const bodyParser = require('body-parser');
const app = express();

// adding middlewares
if (process.env.NODE_ENV == 'development') {

    app.use(require('morgan')('dev')); // adding logger   
}
app.use(bodyParser.json());

// managing routes
app.use('/api', require('./routes/api'))

// managing 404
app.get('*', (req, res) => {
    res.header('content-type', 'text/plain');
    res.status(404).send('Not Found\n');
});

// resolving port
const port = process.env.NODE_PORT ? parseInt(process.env.NODE_PORT) : process.argv[2] ? parseInt(process.argv[2]) : 3000;
app.listen(port, () => {
    console.clear();
    console.log('[%s] Server is running at http://localhost:%d', new Date(), port);
    console.log("NodeJS Environment : ", process.env.NODE_ENV)
})