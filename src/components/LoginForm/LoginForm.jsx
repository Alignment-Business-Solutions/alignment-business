import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import {
  TextField,
  Button,
  Typography,
  Container,
  CssBaseline,
  Grid,
} from "@mui/material";

function LoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const errors = useSelector((store) => store.errors);
  const dispatch = useDispatch();

  const login = (event) => {
    event.preventDefault();

    if (username && password) {
      dispatch({
        type: "LOGIN",
        payload: {
          username: username,
          password: password,
        },
      });
    } else {
      dispatch({ type: "LOGIN_INPUT_ERROR" });
    }
  }; // end login

  return (
    <Container component="main" maxWidth="xs">
      <div className="formPanel">
        <Typography variant="h4">Login</Typography>
        {errors.loginMessage && (
          <Typography className="alert" role="alert" variant="h3" color="error">
            {errors.loginMessage}
          </Typography>
        )}
        <br></br>
        <form onSubmit={login}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                label="Username"
                type="text"
                fullWidth
                name="username"
                required
                value={username}
                onChange={(event) => setUsername(event.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Password"
                type="password"
                fullWidth
                name="password"
                required
                value={password}
                onChange={(event) => setPassword(event.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className="btn"
              >
                Log In
              </Button>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
}

export default LoginForm;
