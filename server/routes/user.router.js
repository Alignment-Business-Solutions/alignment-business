const express = require("express");
const {
  rejectUnauthenticated,
} = require("../modules/authentication-middleware");
const encryptLib = require("../modules/encryption");
const pool = require("../modules/pool");
const userStrategy = require("../strategies/user.strategy");

const router = express.Router();

// Handles Ajax request for user information if user is authenticated
router.get("/", rejectUnauthenticated, (req, res) => {
  // Send back user object from the session (previously queried from the database)
  res.send(req.user);
});

// Handles POST request with new user data
// The only thing different from this and every other post we've seen
// is that the password gets encrypted before being inserted
router.post("/register", async (req, res, next) => {
  const username = req.body.username;
  const password = encryptLib.encryptPassword(req.body.password);
  const userType = req.body.userType;
  const accessLevel = userType === "Accountant" ? 1 : 0;

  const client = await pool.connect(); // Acquire a client from the connection pool

  try {
    await client.query("BEGIN"); // Start the transaction

    // Query 1: Insert into "user" table and get the user_id
    const queryTextUser = `INSERT INTO "user" (username, password, access_level)
        VALUES ($1, $2, $3) RETURNING id`;

    const userResult = await client.query(queryTextUser, [
      username,
      password,
      accessLevel,
    ]);
    const userId = userResult.rows[0].id;

    if (userType === "Accountant") {
      // Check if the accountant already exists in "accountants" table
      const first_name = req.body.firstName;
      const last_name = req.body.lastName;

      const queryTextCheckAccountant = `
          SELECT * FROM "accountants" WHERE first_name = $1 AND last_name = $2;
        `;

      const checkResult = await client.query(queryTextCheckAccountant, [
        first_name,
        last_name,
      ]);

      if (checkResult.rowCount > 0) {
        // Accountant already exists, so update the existing entry with new user_id
        const queryTextAccountantUpdate = `
            UPDATE "accountants" SET user_id = $1 WHERE first_name = $2 AND last_name = $3;
          `;

        await client.query(queryTextAccountantUpdate, [
          userId,
          first_name,
          last_name,
        ]);
      } else {
        // Accountant does not exist, so do not create a new entry
        res.status(400).json({ message: "Accountant does not exist" });
        return; // Return early to skip the insertion step
      }
    } else if (userType === "Client") {
      // Query 3: Insert into "client" table
      const company_name = req.body.companyName;

      const queryTextCheckClient = `
          SELECT * FROM "client" WHERE company_name = $1;
        `;

      const checkResult = await client.query(queryTextCheckClient, [
        company_name,
      ]);

      if (checkResult.rowCount > 0) {
        // Client already exists, so update the existing entry with new user_id
        const queryTextClientUpdate = `
            UPDATE "client" SET user_id = $1 WHERE company_name = $2;
          `;

        await client.query(queryTextClientUpdate, [userId, company_name]);
      } else {
        // Company does not exist, so do not create a new entry
        res.status(400).json({ message: "Company does not exist" });
        return; // Return early to skip the insertion step
      }
    }

    await client.query("COMMIT"); // Commit the transaction

    res.sendStatus(201);
  } catch (err) {
    await client.query("ROLLBACK"); // Rollback the transaction in case of an error
    console.log("User registration failed: ", err);
    res.sendStatus(500);
  } finally {
    client.release(); // Release the client back to the connection pool
  }
});

// Handles login form authenticate/login POST
// userStrategy.authenticate('local') is middleware that we run on this route
// this middleware will run our POST if successful
// this middleware will send a 404 if not successful
router.post("/login", userStrategy.authenticate("local"), (req, res) => {
  res.sendStatus(200);
});

// clear all server session information about this user
router.post("/logout", (req, res) => {
  // Use passport's built-in method to log out the user
  req.logout();
  res.sendStatus(200);
});

module.exports = router;
