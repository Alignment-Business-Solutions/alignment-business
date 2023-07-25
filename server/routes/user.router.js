const express = require('express');
const {
  rejectUnauthenticated,
} = require('../modules/authentication-middleware');
const encryptLib = require('../modules/encryption');
const pool = require('../modules/pool');
const userStrategy = require('../strategies/user.strategy');

const router = express.Router();

// Handles Ajax request for user information if user is authenticated
router.get('/', rejectUnauthenticated, (req, res) => {
  // Send back user object from the session (previously queried from the database)
  res.send(req.user);
});

// Handles POST request with new user data
// The only thing different from this and every other post we've seen
// is that the password gets encrypted before being inserted
router.post('/register', async (req, res, next) => {
  const username = req.body.username;
  const password = encryptLib.encryptPassword(req.body.password);
  const userType = req.body.userType;
  const accessLevel = userType === 'Accountant' ? 1 : 0;

  const client = await pool.connect(); // Acquire a client from the connection pool

  try {
    await client.query('BEGIN'); // Start the transaction

    // Query 1: Insert into "user" table and get the user_id
    const queryTextUser = `INSERT INTO "user" (username, password, access_level)
      VALUES ($1, $2, $3) RETURNING id`;

    const userResult = await client.query(queryTextUser, [username, password, accessLevel]);
    const userId = userResult.rows[0].id;

    if (userType === 'Accountant') {
      // Query 2: Insert into "accountants" table
      const first_name = req.body.firstName;
      const last_name = req.body.lastName;

      const queryTextAccountant = `INSERT INTO "accountants" (user_id, first_name, last_name)
        VALUES ($1, $2, $3) RETURNING id`;

      await client.query(queryTextAccountant, [userId, first_name, last_name]);
    } else if (userType === 'Client') {
      // Query 3: Insert into "client" table
      const company_name = req.body.companyName;

      const queryTextClient = `INSERT INTO "client" (user_id, company_name)
        VALUES ($1, $2) RETURNING id`;

      await client.query(queryTextClient, [userId, company_name]);
    }

    await client.query('COMMIT'); // Commit the transaction

    res.sendStatus(201);
  } catch (err) {
    await client.query('ROLLBACK'); // Rollback the transaction in case of an error
    console.log('User registration failed: ', err);
    res.sendStatus(500);
  } finally {
    client.release(); // Release the client back to the connection pool
  }
});


// Handles login form authenticate/login POST
// userStrategy.authenticate('local') is middleware that we run on this route
// this middleware will run our POST if successful
// this middleware will send a 404 if not successful
router.post('/login', userStrategy.authenticate('local'), (req, res) => {
  res.sendStatus(200);
});

// clear all server session information about this user
router.post('/logout', (req, res) => {
  // Use passport's built-in method to log out the user
  req.logout();
  res.sendStatus(200);
});

module.exports = router;
