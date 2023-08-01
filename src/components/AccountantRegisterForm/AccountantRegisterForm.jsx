import { useState } from "react";
import { Typography, TextField } from "@mui/material";

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
    <br></br>
      <Typography variant="h5">Accountant Registration:</Typography>
      <br></br>
      <div>
        <TextField
          label="First Name"
          type="text"
          name="firstName"
          value={firstName}
          required
          onChange={(event) => setFirstName(event.target.value)}
        />
      </div>
      <br></br>
      <div>
        <TextField
          label="Last Name"
          type="text"
          name="lastName"
          value={lastName}
          required
          onChange={(event) => setLastName(event.target.value)}
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

export default AccountantRegisterForm;
