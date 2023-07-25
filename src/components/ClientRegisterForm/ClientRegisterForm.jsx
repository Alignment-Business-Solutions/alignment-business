import { useState } from "react";

function ClientRegisterForm({ username, setUsername, password, setPassword, companyName, setCompanyName }) {
  return (
    <>
      <h3>Client Registration:</h3>
      <div>
        <label htmlFor="companyName">
          Company Name:
          <input
            type="companyName"
            name="companyName"
            value={companyName}
            required
            onChange={(event) => setCompanyName(event.target.value)}
          />
        </label>
      </div>
      <div>
        <label htmlFor="username">
          Username:
          <input
            type="text"
            name="username"
            value={username}
            required
            onChange={(event) => setUsername(event.target.value)}
          />
        </label>
      </div>
      <div>
        <label htmlFor="password">
          Password:
          <input
            type="password"
            name="password"
            value={password}
            required
            onChange={(event) => setPassword(event.target.value)}
          />
        </label>
      </div>
    </>
  );
}

export default ClientRegisterForm;
