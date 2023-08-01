import { all } from 'redux-saga/effects';
import loginSaga from './login.saga';
import registrationSaga from './registration.saga';
import userSaga from './user.saga';
import singlePLsaga from './singlePL.saga';
import clientsSaga from './clients.saga'
import fetchRecentSaga from './fetch_recent_pl.saga';
import myClientsSaga from './myClients.saga'
import submitNewWeekSaga from './createNewWeek.saga';
import addClientSaga from './addClient.saga';
import fetchWeeksDropdownSaga from './fetchWeeksDropdown.saga';
import fetchAllWeeksSaga from './fetchAllWeeks.saga';
import categoriesSaga from './categories.saga';
import removeClientSaga from './removeClient.saga';
import balanceSaga from './fetchBalance.saga'
import addBalanceSaga from './addBalance.saga';
import deleteBalanceSaga from './removeBalance.saga';
import editBalanceSaga from './editBalance.saga';
// rootSaga is the primary saga.
// It bundles up all of the other sagas so our project can use them.
// This is imported in index.js as rootSaga

// some sagas trigger other sagas, as an example
// the registration triggers a login
// and login triggers setting the user
export default function* rootSaga() {
  yield all([
    loginSaga(), // login saga is now registered
    registrationSaga(),
    userSaga(),
    fetchRecentSaga(),
    singlePLsaga(),
    clientsSaga(),
    myClientsSaga(),
    submitNewWeekSaga(),
    addClientSaga(),
    fetchWeeksDropdownSaga(),
    fetchAllWeeksSaga(),

    categoriesSaga(),
    removeClientSaga(),
    balanceSaga(),
    addBalanceSaga(),
    deleteBalanceSaga(),
    editBalanceSaga(),
  ]);
}
