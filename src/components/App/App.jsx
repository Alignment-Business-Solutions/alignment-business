import React, { useEffect } from 'react';
import {
  HashRouter as Router,
  Redirect,
  Route,
  Switch,
} from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';

import Nav from '../Nav/Nav';
import Footer from '../Footer/Footer';

import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';

import AboutPage from '../AboutPage/AboutPage';
import UserPage from '../UserPage/UserPage';
import LoginPage from '../LoginPage/LoginPage';
import RegisterPage from '../RegisterPage/RegisterPage';
import ClientList from '../ClientList/ClientList';
import MyClients from '../MyClients/MyClients';

import MultiPL from '../AllPL/AllPL';
import SinglePL from '../SinglePL/SinglePL';

import './App.css';
import ViewSummary from '../ViewSummary/ViewSummary';
import BalanceSheet from '../BalanceSheet/BalanceSheet';

function App() {
  const dispatch = useDispatch();

  const user = useSelector(store => store.user);

  const clientInfo = useSelector(store => store.clientInfo);
  const path = clientInfo && `/viewsummary/${clientInfo.id}`

  console.log('clientInfo is:', clientInfo);
  console.log('user.access_level is:', user.access_level);

  useEffect(() => {
    dispatch({ type: 'FETCH_USER' });

  }, [dispatch]);

  return (
    <Router>
      <div>
        <Nav />
        <Switch>
          {/* Visiting localhost:3000 will redirect to localhost:3000/home */}
          <Redirect exact from="/" to="/home" />

          {/* Visiting localhost:3000/about will show the about page. */}
          <Route
            // shows AboutPage at all times (logged in or not)
            exact
            path="/about"
          >
            <AboutPage />
          </Route>

          {/* For protected routes, the view could show one of several things on the same route.
            Visiting localhost:3000/user will show the UserPage if the user is logged in.
            If the user is not logged in, the ProtectedRoute will show the LoginPage (component).
            Even though it seems like they are different pages, the user is always on localhost:3000/user */}
          <ProtectedRoute
            // logged in shows UserPage else shows LoginPage
            exact
            path="/user"
          >
            <UserPage />
          </ProtectedRoute>
          <ProtectedRoute
            // logged in shows the Clients View
            exact
            path="/clients"
          >
            <ClientList />
          </ProtectedRoute>
          <ProtectedRoute
            // logged in shows the Balance Sheet View
            exact
            path="/balance"
          >
            <BalanceSheet />
          </ProtectedRoute>

          <ProtectedRoute
            // shows Accountants Clients 
            exact
            path="/myClients"
          >
            <MyClients />
          </ProtectedRoute>

          <ProtectedRoute 
            exact
            path="/viewsummary/:client_id"
          >
            <ViewSummary />
          </ProtectedRoute>

          <ProtectedRoute
            exact
            path="/allPL"
          >
            <MultiPL />
          </ProtectedRoute>

          <Route
            exact
            path="/login"
          >
            {user.id ?
              // If the user is already logged in, 
              // redirect to the /user page
              (user.access_level !== 0 ? (<Redirect to="/myClients"/>) : (<Redirect to={path}/>)) 
              :
              // Otherwise, show the login page
              <LoginPage />
            }
          </Route>


          <Route
            exact
            path="/registration"
          >
            {user.id ?
              // If the user is already logged in, 
              // redirect them to the /user page
              <Redirect to="/user" />
              :
              // Otherwise, show the registration page
              <RegisterPage />
            }
          </Route>
        <ProtectedRoute
            exact
            path="/singlePL/:client_id/:week_id"
        >
            <SinglePL/>
        </ProtectedRoute>

          <Route
            exact
            path="/home"
          >
            {user.id ?
              // If the user is already logged in, 
              // redirect them to the /user page
              (user.access_level !== 0 ? (<Redirect to="/myClients"/>) : (<Redirect to={path}/>)) 

              :
              // Otherwise, show the Login page
              <LoginPage />
            }
          </Route>

          {/* If none of the other routes matched, we will show a 404. */}
          <Route>
            <h1>404</h1>
          </Route>
        </Switch>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
