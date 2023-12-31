import { combineReducers } from 'redux';
import errors from './errors.reducer';
import user from './user.reducer';
import allClients from './clients.reducer';
import singlePL from './singlePL.reducer.js';
import recentPL from './recentPL.reducer';
import myClients from './myClients.reducer'
import weeksDropdown from './weeksDropdown.reducer';
import allWeeks from './allWeeks.reducer';
import allPL from './allPL.reducer';
import categories from './categories.reducer.js';
import importQBData from './importQBData.reducer.js';
import importRegData from './importRegData.reducer.js';
import balance from './balance.reducer';
import clientInfo from './clientInfo.reducer';
import selectedClient from './selectedClient.reducer.jsx';
import recentBalance from './recentBalance.reducer';
import endBalance from './endBalances.reducer';

// rootReducer is the primary reducer for our entire project
// It bundles up all of the other reducers so our project can use them.
// This is imported in index.js as rootSaga

// Lets make a bigger object for our store, with the objects from our reducers.
// This is what we get when we use 'state' inside of 'mapStateToProps'
const rootReducer = combineReducers({
  errors, // contains registrationMessage and loginMessage
  user, // will have an id and username if someone is logged in
  allClients,
  recentPL,
  singlePL,
  myClients,
  weeksDropdown,
  allWeeks,
  allPL,
  selectedClient, 
  categories,
  importQBData,
  importRegData,
  balance,
  clientInfo,
  recentBalance,
  endBalance,
});

export default rootReducer;
