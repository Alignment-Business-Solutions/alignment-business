import React, { useEffect } from "react";
import {
  HashRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";

import Nav from "../Nav/Nav";
import Footer from "../Footer/Footer";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import AboutPage from "../AboutPage/AboutPage";
import UserPage from "../UserPage/UserPage";
import LoginPage from "../LoginPage/LoginPage";
import RegisterPage from "../RegisterPage/RegisterPage";
import ClientList from "../ClientList/ClientList";
import MyClients from "../MyClients/MyClients";
import MultiPL from "../AllPL/AllPL";
import SinglePL from "../SinglePL/SinglePL";
import CashFlow from "../CashFlow/CashFlow";

import "./App.css";
import ViewSummary from "../ViewSummary/ViewSummary";
import BalanceSheet from "../BalanceSheet/BalanceSheet";
import { createTheme, ThemeProvider } from "@mui/material";

import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

function App() {
  const dispatch = useDispatch();

  const user = useSelector((store) => store.user);

  const clientInfo = useSelector((store) => store.clientInfo);
  const path = clientInfo && `/viewsummary/${clientInfo.id}`;

  const theme = createTheme({
    palette: {
      primary: {
        main: "#EB017F",
      },
      secondary: {
        main: "#451F44",
      },
    },
    // palette: {
    //   abs: {
    //     main: '#EB017F',
    //     purple: '#451F44',
    //     blue: '#00B4EB'
    //   }
    // }
  });

  useEffect(() => {
    dispatch({ type: "FETCH_USER" });
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
            <ThemeProvider theme={theme}>
              <ClientList />
            </ThemeProvider>
          </ProtectedRoute>
          <ProtectedRoute
            // logged in shows the Balance Sheet View
            exact
            path="/balance/:client_id"
          >
            <ThemeProvider theme={theme}>
              <BalanceSheet />
            </ThemeProvider>
          </ProtectedRoute>

          <ProtectedRoute
            // shows Accountants Clients
            exact
            path="/myClients"
          >
            <ThemeProvider theme={theme}>
              <MyClients />
            </ThemeProvider>
          </ProtectedRoute>

          <ProtectedRoute exact path="/viewsummary/:client_id">
            <ThemeProvider theme={theme}>
              <ViewSummary />
            </ThemeProvider>
          </ProtectedRoute>

          <ProtectedRoute exact path="/allPL/:client_id">
            <ThemeProvider theme={theme}>
              <MultiPL />
            </ThemeProvider>
          </ProtectedRoute>

          <ProtectedRoute exact path="/cashflow/:client_id">
            <ThemeProvider theme={theme}>
              <CashFlow width={2000} height={800}/>
            </ThemeProvider>
          </ProtectedRoute>

          <Route exact path="/login">
            {user.id ? (
              // If the user is already logged in,
              // redirect to the /user page
              <Redirect to="/user" />
            ) : (
              // Otherwise, show the login page
              <ThemeProvider theme={theme}>
                <LoginPage />
              </ThemeProvider>
            )}
          </Route>

          <Route exact path="/registration">
            {user.id ? (
              // If the user is already logged in,
              // redirect them to the /user page
              <Redirect to="/user" />
            ) : (
              // Otherwise, show the registration page
              <ThemeProvider theme={theme}>
                <RegisterPage />
              </ThemeProvider>
            )}
          </Route>

          <ProtectedRoute exact path="/singlePL/:client_id/:week_id">
            <ThemeProvider theme={theme}>
              <SinglePL />
            </ThemeProvider>
          </ProtectedRoute>

          <Route exact path="/home">
            {user.id ? (
              // If the user is already logged in,
              // redirect them to the /user page
              user.access_level !== 0 ? (
                <Redirect to="/myClients" />
              ) : (
                <Redirect to={path} />
              )
            ) : (
              // Otherwise, show the Login page
              <ThemeProvider theme={theme}>
                <LoginPage />
              </ThemeProvider>
            )}
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
