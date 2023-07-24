const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();


router.get('/myClients', (req,res) => {
    // GET route code here
    pool.query(`SELECT * FROM client JOIN accountants 
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
     const sqlText = (`UPDATE client SET "accountant_id" = $1
      WHERE client."id" = $2;
      `)

      pool.query(sqlText, [req.body.accountant_id], [req.body.id])
      .then(result => {
        res.sendStatus(201)
      })
      .catch(err => {
        console.log('Error SERVER UPDATING CLIENT LIST===>', err)
        res.sendStatus(500)
      })

});

router.delete('/', (req, res) => {
    // DELETE route code here

});



module.exports = router;