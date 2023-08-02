import { useState } from "react";
import { Typography, TextField, Container, Grid } from "@mui/material";

function ClientRegisterForm({
  username,
  setUsername,
  password,
  setPassword,
  companyName,
  setCompanyName,
}) {
  return (
    <>
      <Container style={{ textAlign: "center" }}>
        <br></br>
        <Typography variant="h5">Client Registration:</Typography>
        <br></br>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              label="Company Name"
              type="text"
              name="companyName"
              value={companyName}
              required
              onChange={(event) => setCompanyName(event.target.value)}
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

export default ClientRegisterForm;
