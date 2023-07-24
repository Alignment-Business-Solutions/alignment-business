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
    pool.query(`SELECT * FROM client` , [req.user.id])
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

router.put('/', (req, res) => {
      // PUT route code here
      pool.query(`UPDATE client SET "accountant_id" = $1
      WHERE client."id" = $2;
      `)

});

router.delete('/', (req, res) => {
    // DELETE route code here

});



module.exports = router;