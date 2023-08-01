import React, { useState } from "react";
import Modal from "react-modal";
import { Typography, TextField, Button } from "@mui/material";

function AddClient({ isOpen, onRequestClose, onAdd }) {
  const [companyName, setCompanyName] = useState("");

  const handleAdd = () => {
    // Perform any additional validation or data processing here
    onAdd({ companyName });
    console.log("Company name is:", companyName);
    setCompanyName(""); // Clear the input field after submitting
    onRequestClose(); // Close the modal after adding the accountant
  };

  // Custom style for the modal
  const customModalStyle = {
    content: {
      width: "400px",
      height: "250px",
      margin: "auto",
    },
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Add Client Modal"
      ariaHideApp={false}
      style={customModalStyle}
    >
      <Button variant="contained" onClick={onRequestClose}>
        X
      </Button>
      <br></br>
      <br></br>
      <Typography variant="h4">New Client</Typography>
      <br></br>
      <form>
        <div>
          <TextField
            label="Company Name"
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
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
}

export default AddClient;
