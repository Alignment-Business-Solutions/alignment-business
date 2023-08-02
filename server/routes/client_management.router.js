const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const {
    rejectUnauthenticated,
} = require('../modules/authentication-middleware');


router.get('/myClients', rejectUnauthenticated, (req,res) => {
    // GET route code here
    console.log(req.user.id);
    pool.query(`SELECT "client"."id" AS "client_id", * FROM client 
                JOIN accountants ON client.accountant_id = accountants.user_id
                WHERE "accountant_id" = $1;`, [req.user.id])
    .then(result => {
        console.log('clientRouter GET result by Accountant ==> ', result.rows)
        res.send(result.rows)
    }).catch( err => {
        console.log('Error with ClientRouter with Accountant GET', err)
        res.sendStatus(500)
    })

});

router.get('/',rejectUnauthenticated, (req,res) => {
    // GET route code here
    pool.query(`SELECT * FROM client` )
    .then(result => {
        console.log('clientRouter GET result for Client ==> ', result.rows)
        res.send(result.rows)
    }).catch( err => {
        console.log('Error with ClientRouter GET', err)
        res.sendStatus(500)
    })

})

router.put('/add',rejectUnauthenticated,  (req, res) => {
    console.log('OUR REQ.BODY',req.body)
      // PUT route code here
      // protect route at some point
     const sqlText = `UPDATE client SET "accountant_id" = $1
      WHERE client."id" = $2;
      `;
    const sqlValues = [req.user.id,req.body.client_id]
      pool.query(sqlText,sqlValues)
      .then(result => {
        res.sendStatus(201)
      }).catch(err => {
        console.log('Error with CLIENT PUT', err)
        res.sendStatus(500)
      })
      
  

});

router.put('/remove', rejectUnauthenticated, (req, res) => {
    console.log('OUR REQ.BODY',req.body)
      // PUT route code here
      // protect route at some point
const sqlText =  `UPDATE client SET "accountant_id" = NULL
      WHERE "id" = $1`;
const sqlValues = [req.body.client_id];
      pool.query(sqlText,sqlValues)
      .then(result => {
        res.sendStatus(201)
      }).catch(err => {
        console.log('Error with CLIENT PUT', err)
        res.sendStatus(500)
      })
      
  

});
//UPDATE client SET "accountant_id" = null 
//WHERE client.id = 1;

router.delete('/', (req, res) => {
    // DELETE route code here

});

// Route for admin to add a new accountant to database:
router.post('/createaccountant', rejectUnauthenticated, (req, res) => {
  const { first_name, last_name } = req.body;

  const queryText = `
    INSERT INTO "accountants" (first_name, last_name)
    VALUES ($1, $2)
    RETURNING id;
  `;

  const values = [first_name, last_name];

  pool
    .query(queryText, values)
    .then((result) => {
      console.log('Accountant added to the database:', result.rows[0]);
      res.sendStatus(201); // Respond with a success status code
    })
    .catch((error) => {
      console.error('Error adding accountant to the database:', error);
      res.sendStatus(500); // Respond with an error status code
    });
});

// Route for accountant to create a new client:
router.post('/createclient', rejectUnauthenticated, (req, res) => {
  const { company_name } = req.body;
  console.log("REQ.BODY IS:", req.body)

  const queryText = `
    INSERT INTO "client" (company_name)
    VALUES ($1)
    RETURNING id;
  `;

  const values = [company_name];

  pool
    .query(queryText, values)
    .then((result) => {
      console.log('Client added to the database:', result.rows[0]);
      res.sendStatus(201); // Respond with a success status code
    })
    .catch((error) => {
      console.error('Error adding client to the database:', error);
      res.sendStatus(500); // Respond with an error status code
    });
});

router.get('/info', rejectUnauthenticated, (req, res) => {
  console.log('In GET route for client info')
  queryText = `SELECT * FROM "client" WHERE "user_id" = $1;`;
  pool.query (queryText, [req.user.id])
  .then((result) => {
    console.log('Data received form getClientInfo:', result.rows);
    res.send(result.rows)
  }).catch(error => {
    console.error('Error getting client info:', error)
    res.sendStatus(500);
  });
})

router.get('/selected/:id', (req, res) => {
    if (req.isAuthenticated()) {
    console.log(req.params.id);
    queryText = `SELECT * FROM "client" WHERE "id" = $1;`;
    pool.query (queryText, [req.params.id/1])
    .then((result) => {
        console.log(result.rows);
        res.send(result.rows)
    }).catch(error => {
        console.error('Error getting client info:', error)
        res.sendStatus(500);
    });
    }
    else {
        res.sendStatus(403);
    }



});

module.exports = router;
