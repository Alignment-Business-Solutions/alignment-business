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
        const query_text =  `SELECT * FROM transactions WHERE client_id = $1 and week_id = $2 ORDER BY date ASC;`; 
        
        pool.query(query_text, [client_id, week])
        .then(results => {
            console.log(results.rows);
            res.send(results.rows);
        }).catch(error => {
            console.log('error with query', query_text, "error ==", error);
            res.sendStatus(500); 
        });

    } else {
        res.sendStatus(403);

    } 
});

router.post('/', (req, res) => {
  // POST route code here
});

router.put('/:id', (req, res) => {
    console.log(req.params.id);
    const updateItem = req.body.data;
    console.log(updateItem);
    const queryText = `
        UPDATE transactions 
        SET date = $1, 
        payee = $2, 
        amount = $3, 
        paid = $4,
        category_id = $5
        WHERE id = $6;`;
    const values =[
        updateItem.date,
        updateItem.payee,
        updateItem.amount,
        updateItem.paid,
        updateItem.category_id,
        req.params.id
    ];

    pool.query(queryText, values)
    .then(results => {
        console.log('success');
        res.sendStatus(200);
    }).catch(error => {
        console.log('error with query', queryText, "error ==", error);
        res.sendStatus(500); 
    });
});

module.exports = router;











