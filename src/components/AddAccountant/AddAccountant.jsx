import React, { useState } from "react";
import Modal from "react-modal";

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

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Add Accountant Modal"
      ariaHideApp={false}
    >
      <button type="button" onClick={onRequestClose}>
        X
      </button>
      <h2>New Accountant</h2>
      <form>
        <div>
          <label>
            First Name:
            <input
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
          </label>
        </div>
        <div>
          <label>
            Last Name:
            <input
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </label>
        </div>
        <button type="button" onClick={handleAdd}>
          Add
        </button>
      </form>
    </Modal>
  );
};

export default AddAccountant;