const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const {
    rejectUnauthenticated,
} = require('../modules/authentication-middleware');

router.get('/', rejectUnauthenticated, (req, res) => {
    const queryText = `SELECT "transactions"."id", "date", "payee", "amount", "paid", "category_id" FROM "transactions" 
    WHERE "client_id" = 1
    AND "week_id" = 1
    ORDER BY "category_id";`;
    pool.query(queryText)
        .then(result => {
            res.send(result.rows);
        }).catch(error => {
            console.log('error in GET recent_PL router:', error);
            res.sendStatus(500);
        })
});

router.post('/', (req, res) => {
    console.log('req.body for createNewWeek POST server side is:', req.body);
    const start_date = [
        req.body.start_date
    ]

    const queryText = `INSERT INTO "weeks" ("start_date") VALUES
	($1);`;
    pool.query(queryText, start_date)
        .then(result => {
            res.sendStatus(201);
        }).catch(error => {
            console.log('error in createNewWeek POST request:', error)
            res.sendStatus(500);
        })
});

module.exports = router;