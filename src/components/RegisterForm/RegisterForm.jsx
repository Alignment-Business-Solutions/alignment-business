import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import AccountantRegisterForm from '../AccountantRegisterForm/AccountantRegisterForm';
import ClientRegisterForm from '../ClientRegisterForm/ClientRegisterForm';

function RegisterForm() {
  const [userType, setUserType] = useState('Accountant');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const errors = useSelector((store) => store.errors);
  const dispatch = useDispatch();

  const registerUser = (event) => {
    event.preventDefault();

    dispatch({
      type: 'REGISTER',
      payload: {
        userType: userType,
        username: username,
        password: password,
      },
    });
  }; // end registerUser

  return (
    <form className="formPanel" onSubmit={registerUser}>
      <h2>Register User</h2>
      {errors.registrationMessage && (
        <h3 className="alert" role="alert">
          {errors.registrationMessage}
        </h3>
      )}
      <div>
        <label>
          <input
            type="radio"
            name="userType"
            value="Accountant"
            checked={userType === 'Accountant'}
            onChange={() => setUserType('Accountant')}
          />
          Accountant
        </label>
        <label>
          <input
            type="radio"
            name="userType"
            value="Client"
            checked={userType === 'Client'}
            onChange={() => setUserType('Client')}
          />
          Client
        </label>
              {/* Conditionally render separate register forms based on userType */}
        {userType === 'Accountant' && <AccountantRegisterForm username = {username} password={password} setUsername={setUsername} setPassword={setPassword}/>}
              {userType === 'Client' && <ClientRegisterForm username = {username} password={password} setUsername={setUsername} setPassword={setPassword}/>}

        <input className="btn" type="submit" name="submit" value="Register" />
      </div>
          </form>
  );
}

export default RegisterForm;
