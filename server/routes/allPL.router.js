const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const {
    rejectUnauthenticated,
} = require('../modules/authentication-middleware');

/**
 * GET route template
 */
router.get('/', rejectUnauthenticated, async (req, res) => {
    // Note: I tested this code in Postman without rejectUnauthenticated
    // router.get('/', async (req, res) => {
        // array of arrays
        // [ [rows for week 1], [rows for week 2], [etc] ]
        let weeklyData = [];
    
        // establish a connection, to be used by all these queries
        const connection = await pool.connect();
    
        try {
            const weeksSql = `SELECT "weeks"."id", "start_date" FROM "weeks"
            ORDER BY "start_date";`;
            const weeksResult = await connection.query(weeksSql);
            // weeksResult.rows is something like [ {id: 1}, {id: 2}, {etc} ]
    
            const transactionsSql = `SELECT "transactions"."id", "date", "payee", "amount", "paid", "start_date", "client_id", "category_id", "week_id" FROM "transactions" 
            JOIN "weeks" ON "weeks"."id" = "transactions"."week_id"
            WHERE "week_id" = $1;`;
            // select all columns from transactions, one week at a time
            for (let week of weeksResult.rows) {
                const transactionsResult = await connection.query(transactionsSql, [week.id]);
                // push one week's worth of transactions to weeklyData array
                // backend code means not React, so we can push to arrays
                weeklyData.push(transactionsResult.rows);
            }
    
            res.send(weeklyData);
        } catch (error) {
            console.log('Error GETting allPL:', error);
            res.sendStatus(500);
        } finally {
            // Always runs - both after successful try & after catch
            // Put the client connection back in the pool
            // This is super important! 
            connection.release();
        }
    });

/**
 * POST route template
 */
router.post('/', (req, res) => {
  // POST route code here
});

module.exports = router;
