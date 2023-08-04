const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const {
    rejectUnauthenticated,
} = require('../modules/authentication-middleware');

router.get('/', rejectUnauthenticated, (req, res) => {
    // console.log('req is:', req)
    console.log('req.query is:', req.query);
    console.log('req.body is:', req.body);
    console.log('req.params is:', req.params)
    const client_id = req.query.clientID/1;
    console.log('clientID is:', client_id);
    const queryText = `SELECT "date", "payee", "amount", "paid", "category_id", "start_date" FROM "transactions"
    JOIN "weeks" ON "weeks"."id" = "transactions"."week_id" 
        WHERE "week_id" = (
        SELECT MAX("week_id") 
        FROM "transactions" 
        WHERE "client_id" = $1
        )
        AND "client_id" = $1
        ORDER BY "category_id";`;
    pool.query(queryText, [client_id])
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

router.post('/', async (req, res) => {
    // the same connection we use for all queries
    const connection = await pool.connect();
    const start_date = [
        req.body.start_date
    ]
    console.log('start_date is:', start_date);

    // basic JS try/catch/finally
    try {
        await connection.query('BEGIN'); // begin transaction

        const sqlAddWeek = `INSERT INTO "weeks" ("start_date") VALUES
      ($1) RETURNING "id";`

        // newId will hold id that's returned
        let newId = await connection.query(sqlAddWeek, [start_date]);
        console.log('newId.rows[0].id is:', newId.rows[0].id);

        const sqlRegister = `INSERT INTO "balance" ("client_id", "week_id")
                          VALUES ($1, $2);`
        await connection.query(sqlRegister, [newId.rows[0].id]);

        // save all the changes made in this transaction
        await connection.query('COMMIT');
        res.sendStatus(200);
    } catch (error) {
        // undo everything that changed in the transaction above
        await connection.query('ROLLBACK');
        console.log('Transaction error:', error);
        res.sendStatus(500);
    } finally {
        // this always runs, both after successful try and after catch
        // puts the connection back in the pool for further use
        // VERY IMPORTANT!
        connection.release();
    }
});

router.get('/weeks', rejectUnauthenticated, (req, res) => {
    const queryText = `SELECT * FROM "weeks"
    ORDER BY "start_date";`;
    pool.query(queryText)
        .then(result => {
            res.send(result.rows);
        }).catch(error => {
            console.log('error in GET weeksDropdown:', error);
            res.sendStatus(500);
        })
});

module.exports = router;