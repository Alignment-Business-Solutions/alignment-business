import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import AccountantRegisterForm from "../AccountantRegisterForm/AccountantRegisterForm";
import ClientRegisterForm from "../ClientRegisterForm/ClientRegisterForm";
import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  Button,
  Typography,
} from "@mui/material";

function RegisterForm() {
  const [userType, setUserType] = useState("Accountant");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [companyName, setCompanyName] = useState("");
  const errors = useSelector((store) => store.errors);
  const dispatch = useDispatch();

  const registerUser = (event) => {
    event.preventDefault();

    dispatch({
      type: "REGISTER",
      payload: {
        userType: userType,
        username: username,
        password: password,
        firstName: firstName,
        lastName: lastName,
        companyName: companyName,
      },
    });
  };

  return (
    <form className="formPanel" onSubmit={registerUser}>
      <Typography variant="h4" style={{ textAlign: "center" }}>Register User</Typography>
      {errors.registrationMessage && (
        <Typography className="alert" role="alert" variant="h3" color="error">
          {errors.registrationMessage}
        </Typography>
      )}
      <FormControl component="fieldset">
        <RadioGroup
          row
          aria-label="userType"
          name="userType"
          value={userType}
          onChange={(e) => setUserType(e.target.value)}
          style={{ display: "flex", justifyContent: "center" }}
        >
          <FormControlLabel
            value="Accountant"
            control={<Radio />}
            label="Accountant"
          />
          <FormControlLabel value="Client" control={<Radio />} label="Client" />
        </RadioGroup>
        {userType === "Accountant" && (
          <AccountantRegisterForm
            username={username}
            password={password}
            firstName={firstName}
            lastName={lastName}
            setUsername={setUsername}
            setPassword={setPassword}
            setFirstName={setFirstName}
            setLastName={setLastName}
            style={{ display: "flex", justifyContent: "center" }}
          />
        )}
        {userType === "Client" && (
          <ClientRegisterForm
            username={username}
            password={password}
            companyName={companyName}
            setUsername={setUsername}
            setPassword={setPassword}
            setCompanyName={setCompanyName}
          />
        )}
        <Button
          className="btn"
          type="submit"
          variant="contained"
          color="primary"
        >
          Register
        </Button>
      </FormControl>
    </form>
  );
}

export default RegisterForm;
