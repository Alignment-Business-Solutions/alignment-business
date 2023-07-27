const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const {
    rejectUnauthenticated,
} = require('../modules/authentication-middleware');


// router.get('/', (req, res) => {
//   // GET route code here
//   pool.query(`SELECT * FROM "balance";` )
//   .then(result => {
//       console.log('balanceRouter GET result ==> ', result.rows)
//       res.send(result.rows)
//   }).catch( err => {
//       console.log('Error with balanceRouter GET', err)
//       res.sendStatus(500)
//   })
// });

router.get('/', rejectUnauthenticated, async (req, res) => {
    // Note: I tested this code in Postman without rejectUnauthenticated
    // router.get('/', async (req, res) => {
        // array of arrays
        // [ [rows for week 1], [rows for week 2], [etc] ]
        let weeklyData = [];
    
        // establish a connection, to be used by all these queries
        const connection = await pool.connect();
    
        try {
            const weeksSql = `SELECT "weeks"."id" FROM "weeks";`;
            const weeksResult = await connection.query(weeksSql);
            // weeksResult.rows is something like [ {id: 1}, {id: 2}, {etc} ]
    
            const balanceSql = `SELECT * FROM "balance" WHERE client_id = $1;`;
            // select all columns from transactions, one week at a time
            for (let week of weeksResult.rows) {
                const balanceResult = await connection.query(balanceSql, [week.id]);
                // push one week's worth of transactions to weeklyData array
                // backend code means not React, so we can push to arrays
                weeklyData.push(balanceResult.rows);
            }
    
            res.send(weeklyData);
        } catch (error) {
            console.log('Error GETting Balance:', error);
            res.sendStatus(500);
        } finally {
            // Always runs - both after successful try & after catch
            // Put the client connection back in the pool
            // This is super important! 
            connection.release();
        }
    });


router.put('/', (req, res) => {
    // PUT route code here
  });
  

router.post('/', (req, res) => {
  // POST route code here
});

router.delete('/', (req, res) => {
    // DELETE route code here
  });
  
module.exports = router;