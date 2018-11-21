/**
 * @file DUMMY API FILE
 */
const router = require('express').Router();

router.get('/', (req, res) => {
    res.status(406).send('GET - Not Accepted');
});

router.head('/', (req, res) => {
    res.status(406).send('HEAD - Not Accepted');
});

router.post('/', (req, res) => {
    res.status(406).send('POST - Not Accepted');
});

router.delete('/', (req, res) => {
    res.status(406).send('DELETE - Not Accepted');
});

router.options('/', (req, res) => {
    res.status(406).send('OPTIONS - Not Accepted');
});

router.put('/', (req, res) => {
    res.status(406).send('PUT - Not Accepted');
});

router.patch('/', (req, res) => {
    res.status(406).send('PATCH - Not Accepted');
});

router.connect('/', (req, res) => {
    res.status(406).send('CONNECT - Not Accepted');
});

module.exports = router;