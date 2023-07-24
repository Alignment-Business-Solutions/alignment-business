const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const {
    rejectUnauthenticated,
} = require('../modules/authentication-middleware');

router.get('/', rejectUnauthenticated, (req, res) => {
    const queryText = `SELECT "date", "payee", "amount", "paid", "category_id" FROM "transactions" 
    WHERE "client_id" = 1
    AND "week_id" = 1
    ORDER BY "category_id";`;
    // console.log('req.user.id in recent_PL GET:', )
    pool.query(queryText)
        .then(result => {
            res.send(result.rows);
        }).catch(error => {
            console.log('error in GET recent_PL router:', error);
            res.sendStatus(500);
        })
})

module.exports = router;