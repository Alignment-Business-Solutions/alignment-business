import { useState } from "react";

function AccountantRegisterForm({
  username,
  password,
  setUsername,
  setPassword,
}) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  // Add your accountant-specific form fields here
  return (
    <>
      <h3>Accountant Registration:</h3>
      <div>
        <label htmlFor="firstName">
          First Name:
          <input
            type="firstName"
            name="firstName"
            value={firstName}
            required
            onChange={(event) => setFirstName(event.target.value)}
          />
        </label>
      </div>
      <div>
        <label htmlFor="lastName">
          Last Name:
          <input
            type="lastName"
            name="lastName"
            value={lastName}
            required
            onChange={(event) => setLastName(event.target.value)}
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

export default AccountantRegisterForm;
