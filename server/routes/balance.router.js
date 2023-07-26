const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();


router.get('/', (req, res) => {
  // GET route code here
  pool.query(`SELECT * FROM "balance";` )
  .then(result => {
      console.log('balanceRouter GET result ==> ', result.rows)
      res.send(result.rows)
  }).catch( err => {
      console.log('Error with balanceRouter GET', err)
      res.sendStatus(500)
  })
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