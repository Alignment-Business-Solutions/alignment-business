import React, { useState } from "react";
import Modal from "react-modal";

function AddClient ({ isOpen, onRequestClose, onAdd }) {
  
  const [companyName, setCompanyName] = useState("");

  const handleAdd = () => {
    // Perform any additional validation or data processing here
    onAdd({ companyName });
    console.log('Company name is:', companyName)
    setCompanyName(""); // Clear the input field after submitting
    onRequestClose(); // Close the modal after adding the accountant
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Add Client Modal"
      ariaHideApp={false}
    >
      <button type="button" onClick={onRequestClose}>
        X
      </button>
      <h2>New Client</h2>
      <form>
        <div>
          <label>
            Company Name
            <input
              type="text"
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
            />
          </label>
        </div>
        <button type="button" onClick={handleAdd}>
          Create
        </button>
      </form>
    </Modal>
  );
};

export default AddClient;