const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();


router.get('/myClients', (req,res) => {
    // GET route code here
    pool.query(`SELECT "client"."id" AS "client_id", * FROM client JOIN accountants 
    ON client.accountant_id = accountants.id
   WHERE accountant_id = $1;` , [req.user.id])
    .then(result => {
        console.log('clientRouter GET result by Accountant ==> ', result.rows)
        res.send(result.rows)
    }).catch( err => {
        console.log('Error with ClientRouter with Accountant GET', err)
        res.sendStatus(500)
    })

});

router.get('/', (req,res) => {
    // GET route code here
    pool.query(`SELECT * FROM client` )
    .then(result => {
        console.log('clientRouter GET result ==> ', result.rows)
        res.send(result.rows)
    }).catch( err => {
        console.log('Error with ClientRouter GET', err)
        res.sendStatus(500)
    })

})

router.post('/', (req, res) => {
    // POST route code here
  });

router.put('/add', (req, res) => {
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

router.put('/remove', (req, res) => {
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

// Route for admin to add an accountant to database:
router.post('/accountant', (req, res) => {
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

module.exports = router;