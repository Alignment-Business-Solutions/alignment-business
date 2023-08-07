const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const {
  rejectUnauthenticated,
} = require('../modules/authentication-middleware');


router.get('/', (req, res) => {


  console.log('What is the GET query ', req.query);

  // GET route code here
  pool.query(`SELECT * FROM "balance" WHERE client_id = $1
  ORDER BY id;`, [req.query.client_id])
    .then(result => {
      console.log('balanceRouter GET result ==> ', result.rows)
      res.send(result.rows)
    }).catch(err => {
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
router.get('/recent', rejectUnauthenticated, (req, res) => {
  // console.log('req is:', req)
  console.log('req.query is:', req.query);
  console.log('req.body is:', req.body);
  console.log('req.params is:', req.params)
  const client_id = req.query.clientID / 1;
  console.log('clientID is:', client_id);
  const queryText = `SELECT "id", "start_date", "ending_balance_actual", "beginning_cash" FROM "balance" 
  WHERE "start_date" = (
  SELECT MAX("start_date") 
  FROM "balance" 
  WHERE "client_id" = $1
  )
  AND "client_id" = $1
  ORDER BY id;`;
  pool.query(queryText, [client_id])
    .then(result => {
      res.send(result.rows);
    }).catch(error => {
      console.log('error in GET recent_PL router:', error);
      res.sendStatus(500);
    })
});

router.get('/end', rejectUnauthenticated, (req, res) => {
  console.log('In get for endBalances');
  const client_id = req.query.clientID / 1;
  console.log('req.query is:', req.query);
  const queryText = `SELECT "ending_balance_actual", "start_date" FROM "balance"
  WHERE "client_id" = $1
  ORDER BY "start_date";`;
  pool.query(queryText, [client_id])
    .then(result => {
      res.send(result.rows);
    }).catch(error => {
      console.log('error in GET recent_PL router:', error);
      res.sendStatus(500);
    })

})

router.put('/edit', async (req, res) => {

  const connection = await pool.connect();

  try {
    let sqlText = `UPDATE balance SET "start_date" = $1, "beginning_cash" = $2, "income_received" = $3, 
    "expenses_paid" = $4,"expenses_expected" = $5, "to_from_savings" = $6,
     "saving_balance" = $7, "outstanding_checks" = $8, "loan_to_from" = $9
     WHERE "id" = $10;
     `;
    const {
      start_date,
      beginning_cash,
      income_received,
      expenses_paid,
      expenses_expected,
      to_from_savings,
      saving_balance,
      outstanding_checks,
      loan_to_from,
      id
    } = req.body;

    let newBalance = await connection.query(sqlText, [start_date,
      beginning_cash,
      income_received,
      expenses_paid,
      expenses_expected,
      to_from_savings,
      saving_balance,
      outstanding_checks,
      loan_to_from,
      id]);

    const sqlCalculation = `UPDATE balance
      SET ending_balance_actual = beginning_cash + income_received - expenses_expected - to_from_savings - outstanding_checks,
          ending_balance_cleared = beginning_cash + income_received - expenses_expected
      WHERE "id" = $1;`
    await connection.query(sqlCalculation, [id]);

    await connection.query('COMMIT');
    res.sendStatus(200);
  } catch (error) {
    await connection.query('ROLLBACK');
    console.log('Balance error:', error);
    res.sendStatus(500);
  } finally {
    connection.release();
  }

});

// router.put('/edit', (req, res) => {
//   // PUT route code here

//   console.log('OUR REQ.BODY', req.body)
//   const sqlText = `UPDATE balance SET "start_date" = $1, "beginning_cash" = $2, "income_received" = $3, 
//    "expenses_paid" = $4,"expenses_expected" = $5, "to_from_savings" = $6,
//     "saving_balance" = $7, "outstanding_checks" = $8, "loan_to_from" = $9
//     WHERE "id" = $10;
//     `;
//   const {
//     start_date,
//     beginning_cash,
//     income_received,
//     expenses_paid,
//     expenses_expected,
//     to_from_savings,
//     saving_balance,
//     outstanding_checks,
//     loan_to_from,
//     // ending_balance_actual,
//     // ending_balance_cleared,
//     id
//   } = req.body;

//   pool
//     .query(sqlText, [
//       start_date,
//       beginning_cash,
//       income_received,
//       expenses_paid,
//       expenses_expected,
//       to_from_savings,
//       saving_balance,
//       outstanding_checks,
//       loan_to_from,
//       // ending_balance_actual,
//       // ending_balance_cleared,
//       id
//     ])
//     .then(result => {
//       res.sendStatus(201)
//     }).catch(err => {
//       console.log('Error with BALANCE PUT', err)
//       res.sendStatus(500)
//     })
// });


router.post('/', async (req, res) => {
  // POST route code here

  const connection = await pool.connect();

  // basic JS try/catch/finally
  try {
    await connection.query('BEGIN'); // begin transaction

    const client_id = req.body.client_id / 1

    const sqlBalance = `INSERT INTO balance ("start_date", "beginning_cash", "income_received", "expenses_paid", 
    "expenses_expected", "to_from_savings", "saving_balance",
     "outstanding_checks", "loan_to_from", "client_id")
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)

    RETURNING "id";;`

    // const sqlValues = [req.body.start_date,req.body.beginning_cash,req.body.income_received, req.body.expenses_paid, 
    //     req.body.expenses_expected,req.body.to_from_savings,
    //     req.body.saving_balance, req.body.outstanding_checks,
    //     req.body.loan_to_from, req.body.client_id
    //  ]

    const {
      start_date,
      beginning_cash,
      income_received,
      expenses_paid,
      expenses_expected,
      to_from_savings,
      saving_balance,
      outstanding_checks,
      loan_to_from,

    } = req.body
    console.log('SQL VALUES', req.body)
    // newBalance will hold id that's returned
    let newBalance = await connection.query(sqlBalance, [start_date,
      beginning_cash,
      income_received,
      expenses_paid,
      expenses_expected,
      to_from_savings,
      saving_balance,
      outstanding_checks,
      loan_to_from,
      client_id]);
    console.log('newBalance.rows[0].id is:', newBalance.rows[0].id);
    const insertResultId = newBalance.rows[0].id;

    const sqlCalculation = `UPDATE balance
    SET ending_balance_actual = beginning_cash + income_received - expenses_expected - to_from_savings - outstanding_checks,
        ending_balance_cleared = beginning_cash + income_received - expenses_expected
    WHERE "id" = $1;`
    await connection.query(sqlCalculation, [insertResultId]);

    // save all the changes made in this transaction
    await connection.query('COMMIT');
    res.sendStatus(200);
  } catch (error) {
    // undo everything that changed in the transaction above
    await connection.query('ROLLBACK');
    console.log('Balance error:', error);
    res.sendStatus(500);
  } finally {
    // this always runs, both after successful try and after catch
    // puts the connection back in the pool for further use
    // VERY IMPORTANT!
    connection.release();
  }
});


router.delete('/:id', (req, res) => {
  // DELETE route code here
  console.log(req.params.id);
  const queryText = `DELETE FROM balance WHERE id=$1;`;
  pool.query(queryText, [req.params.id])
    .then(results => {
      console.log('success');
      res.sendStatus(200);
    }).catch(error => {
      console.log('error with query', queryText, "error ==", error);
      res.sendStatus(500);
    });
});

module.exports = router;