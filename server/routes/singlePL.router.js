const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();


router.get('/', (req, res) => {

    if (req.isAuthenticated()) {
        const week = req.query.week/1;
        const client_id = req.query.client/1;
        const user_id = req.user.id;
        console.log( 'req.query.week is:', req.query.week);
        console.log('accountant user_id', user_id);
        console.log('week', week);
        console.log('client_id', client_id);
        const query_text =  `SELECT * FROM transactions WHERE client_id = $1 and week_id = $2 ORDER BY id ASC;`; 
        
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
    console.log(req.body);
    
    const item = req.body;
    const queryText = `
        INSERT INTO "transactions"
        ("date", "payee", "amount", "paid", "client_id", "week_id", "category_id")
        VALUES( $1, $2, $3, $4, $5, $6, $7 );`;
    const values = [
        item.date,
        item.payee,
        item.amount,
        item.paid,
        item.client_id,
        item.week_id,
        item.category_id
    ];
    
    pool.query(queryText, values)
    .then(results => {
        console.log('success createing item', results.command);
        res.sendStatus(201);
    }).catch(error => {
        console.log('error with query', queryText, "error", error);
        res.sendStatus(500);
    });
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

router.delete('/:id', (req, res) => {
    console.log(req.params.id);
    const queryText = `DELETE FROM transactions WHERE id=$1;`;
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











