const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

router.get('/', (req, res) => {

    pool.query('SELECT * FROM categories')
    .then(results => {
        res.send(results.rows);
    }).catch(error => {
        console.log('error with getting categories from db', error);
        res.sendStatus(500);
    });
});

router.post('/', (req, res) => {
  // POST route code here
});

module.exports = router;






