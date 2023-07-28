const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
// const {
//     rejectUnauthenticated,
// } = require('../modules/authentication-middleware');


router.get('/', (req, res) => {
  // GET route code here
  pool.query(`SELECT * FROM "balance"
  ORDER BY "id";`)
  .then(result => {
      console.log('balanceRouter GET result ==> ', result.rows)
      res.send(result.rows)
  }).catch( err => {
      console.log('Error with balanceRouter GET', err)
      res.sendStatus(500)
  })
});
// SELECT balance.*, weeks.start_date
//   FROM balance
//   JOIN weeks ON balance.week_id = weeks.id;
// router.get('/', rejectUnauthenticated, async (req, res) => {
//     // Note: I tested this code in Postman without rejectUnauthenticated
//     // router.get('/', async (req, res) => {
//         // array of arrays
//         // [ [rows for week 1], [rows for week 2], [etc] ]
//         let weeklyData = [];
    
//         // establish a connection, to be used by all these queries
//         const connection = await pool.connect();
    
//         try {
//             const weeksSql = `SELECT "weeks"."id" FROM "weeks";`;
//             const weeksResult = await connection.query(weeksSql);
//             // weeksResult.rows is something like [ {id: 1}, {id: 2}, {etc} ]
    
//             const balanceSql = `SELECT * FROM "balance" WHERE client_id = $1;`;
//             // select all columns from transactions, one week at a time
//             for (let week of weeksResult.rows) {
//                 const balanceResult = await connection.query(balanceSql, [week.id]);
//                 // push one week's worth of transactions to weeklyData array
//                 // backend code means not React, so we can push to arrays
//                 weeklyData.push(balanceResult.rows[0]);
//                 console.log('Balance Results', balanceResult.rows)
//             }
    
//             res.send(weeklyData);
//         } catch (error) {
//             console.log('Error GETting Balance:', error);
//             res.sendStatus(500);
//         } finally {
//             // Always runs - both after successful try & after catch
//             // Put the client connection back in the pool
//             // This is super important! 
//             connection.release();
//         }
//     });


router.put('/', (req, res) => {
    // PUT route code here
  });
  

router.post('/', async (req, res) => {
  // POST route code here

  const connection = await pool.connect();

  // basic JS try/catch/finally
  try {
    await connection.query('BEGIN'); // begin transaction

    const sqlBalance = `INSERT INTO balance ("start_date", "beginning_cash", "income_received", "expenses_paid", 
    "expenses_expected", "to_from_savings", "saving_balance",
     "outstanding_checks", "loan_to_from", "client_id")
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)

    RETURNING "id";;`
    
    const sqlValues = [req.body.start_date,req.body.beginning_cash,req.body.income_received, req.body.expenses_paid, 
        req.body.expenses_expected,req.body.to_from_savings,
        req.body.saving_balance, req.body.outstanding_checks,
        req.body.loan_to_from, req.body.client_id
     ]
     console.log('SQL VALUES', sqlValues)
    // newBalance will hold id that's returned
    let newBalance = await connection.query(sqlBalance,sqlValues);
    console.log('newBalance.rows[0].id is:', newBalance.rows[0].id);
    const insertResultId = newBalance.rows[0].id;

    const sqlCalculation = `UPDATE balance
    SET ending_balance_actual = balance.beginning_cash + balance.income_received - balance.expenses_expected - balance.to_from_savings - balance.outstanding_checks,
        ending_balance_cleared = balance.beginning_cash + balance.income_received - balance.expenses_expected
    FROM balance 
    WHERE balance."id" = $1;`
    await connection.query(sqlCalculation, [insertResultId]);

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


router.delete('/', (req, res) => {
    // DELETE route code here
  });
  
module.exports = router;