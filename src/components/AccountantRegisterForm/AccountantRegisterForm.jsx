import { useState } from "react";
import { Typography, TextField, Container, Grid } from "@mui/material";

function AccountantRegisterForm({
  username,
  password,
  firstName,
  lastName,
  setUsername,
  setPassword,
  setFirstName,
  setLastName,
}) {
  return (
    <>
    <Container style={{textAlign:"center"}}>
    <br></br>
      <Typography variant="h5">Accountant Registration:</Typography>
      <br></br>
      <Grid container spacing={2}>
      <Grid item xs={12}>
        <TextField
          label="First Name"
          type="text"
          name="firstName"
          value={firstName}
          required
          onChange={(event) => setFirstName(event.target.value)}
          fullWidth
        />
      </Grid>
      <br></br>
      <Grid item xs={12}>
        <TextField
          label="Last Name"
          type="text"
          name="lastName"
          value={lastName}
          required
          onChange={(event) => setLastName(event.target.value)}
          fullWidth
        />
      </Grid>
      <br></br>
      <Grid item xs={12}>
        <TextField
          label="Username"
          type="text"
          name="username"
          value={username}
          required
          onChange={(event) => setUsername(event.target.value)}
          fullWidth
        />
      </Grid>
      <br></br>
      <Grid item xs={12}>
        <TextField
          label="Password"
          type="password"
          name="password"
          value={password}
          required
          onChange={(event) => setPassword(event.target.value)}
          fullWidth
        />
      </Grid>
      </Grid>
      <br></br>
      </Container>
    </>
  );
}

export default AccountantRegisterForm;
