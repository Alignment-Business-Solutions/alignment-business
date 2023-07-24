const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

/**
 * GET route template
 */
router.get('/', (req, res) => {
  // GET route code here
});

/**
 * POST route template
 */
router.post('/', (req, res) => {
    console.log('req.body for createNewWeek POST server side is:', req.body);
    const start_date = [
        req.body.start_date
    ]

    const queryText = `INSERT INTO "weeks" ("start_date") VALUES
	$1;`;
    pool.query(queryText, start_date)
        .then(result => {
            res.sendStatus(201);
        }).catch(error => {
            console.log('error in createNewWeek POST request:', error)
            res.sendStatus(500);
        })
});

module.exports = router;