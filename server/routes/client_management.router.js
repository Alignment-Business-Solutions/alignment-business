const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();


router.get('/', (req,res) => {
    // GET route code here
    pool.query(`SELECT * FROM client JOIN accountants 
    ON client.accountant_id = accountants.id
    ORDER BY client.company_name;` , [req.user.id])
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

});

router.delete('/', (req, res) => {
    // DELETE route code here

});



module.exports = router;