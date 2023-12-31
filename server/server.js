const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();

const sessionMiddleware = require('./modules/session-middleware');
const passport = require('./strategies/user.strategy');

// Route includes
const userRouter = require('./routes/user.router');
const clientRouter = require('./routes/client_management.router')
const singlePLRouter = require('./routes/singlePL.router.js');
const viewSummary = require('./routes/viewSummary.router')
const allPLRouter = require('./routes/allPL.router')
const catRouter = require('./routes/categories.router.js');
const balanceRouter = require('./routes/balance.router');

// const createNewWeekRouter = require('./routes/createNewWeek.router')
// Body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Passport Session Configuration //
app.use(sessionMiddleware);

// start up passport sessions
app.use(passport.initialize());
app.use(passport.session());

/* Routes */
app.use('/api/user', userRouter);
app.use('/api/client', clientRouter);
app.use('/api/viewSummary', viewSummary);
app.use('/api/single', singlePLRouter);
app.use('/api/allPL', allPLRouter);
app.use('/api/cat', catRouter);
app.use('/api/balance', balanceRouter);

// app.use('/api/createNewWeek', createNewWeekRouter);
// Serve static files
app.use(express.static('build'));

// App Set //
const PORT = process.env.PORT || 5000;

/** Listen * */
app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});
