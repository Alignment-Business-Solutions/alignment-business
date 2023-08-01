import React, { useState } from "react";
import Modal from "react-modal";
import { Typography, TextField, Button } from "@mui/material";

const AddAccountant = ({ isOpen, onRequestClose, onAdd }) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const handleAdd = () => {
    // Perform any additional validation or data processing here
    onAdd({ firstName, lastName });
    setFirstName("");
    setLastName("");
    onRequestClose(); // Close the modal after adding the accountant
  };

  const customModalStyle = {
    content: {
      width: "400px",
      height: "310px",
      margin: "auto",
    },
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Add Accountant Modal"
      ariaHideApp={false}
      style={customModalStyle}
    >
      <Button variant="contained" onClick={onRequestClose}>
        X
      </Button>
      <br></br>
      <br></br>
      <Typography variant="h4">New Accountant</Typography>
      <br></br>
      <form>
        <div>
          <TextField
            label="First Name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            fullWidth
          />
        </div>
        <br></br>
        <div>
          <TextField
            label="Last Name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            fullWidth
          />
        </div>
        <br></br>
        <Button variant="contained" onClick={handleAdd}>
          Create
        </Button>
      </form>
    </Modal>
  );
};

export default AddAccountant;
