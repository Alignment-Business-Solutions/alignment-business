const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();


router.get('/', (req, res) => {

    if (req.isAuthenticated()) {
        const week = req.query.week/1;
        const client_id = req.query.client/1;
        const user_id = req.user.id;
        console.log('accountant user_id', user_id);
        console.log('week', week);
        console.log('client_id', client_id);




    } else {
        res.sendStatus(403);

    } 
});

/**
 * POST route template
 */
router.post('/', (req, res) => {
  // POST route code here
});

module.exports = router;











