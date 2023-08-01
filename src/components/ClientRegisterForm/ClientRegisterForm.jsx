import { useState } from "react";
import { Typography, TextField } from "@mui/material";

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
      <br></br>
      <Typography variant="h5">Client Registration:</Typography>
      <br></br>
      <div>
        <TextField
          label="Company Name"
          type="text"
          name="companyName"
          value={companyName}
          required
          onChange={(event) => setCompanyName(event.target.value)}
        />
      </div>
      <br></br>
      <div>
        <TextField
          label="Username"
          type="text"
          name="username"
          value={username}
          required
          onChange={(event) => setUsername(event.target.value)}
        />
      </div>
      <br></br>
      <div>
        <TextField
          label="Password"
          type="password"
          name="password"
          value={password}
          required
          onChange={(event) => setPassword(event.target.value)}
        />
      </div>
      <br></br>
    </>
  );
}

export default ClientRegisterForm;
