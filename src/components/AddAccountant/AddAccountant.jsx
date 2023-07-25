import React, { useState } from "react";
import Modal from "react-modal";

const AddAccountant = ({ isOpen, onRequestClose, onAdd }) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const handleAdd = () => {
    // Perform any additional validation or data processing here
    onAdd({ firstName, lastName });
    onRequestClose(); // Close the modal after adding the accountant
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Add Accountant Modal"
    >
      <button type="button" onClick={onRequestClose}>
        X
      </button>
      <h2>Add Accountant</h2>
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

// ADD TO CLIENTLIST.JSX WHEN CLEAR OF OTHERS:

// PUT UNDER FUNCTION CLIENTLIST()

// const [showModal, setShowModal] = useState(false);

// const handleOpenModal = () => {
//   setShowModal(true);
// };

// const handleCloseModal = () => {
//   setShowModal(false);
// };

// const handleAddAccountant = (accountantData) => {
//   // Handle the data sent from the AddAccountant modal
//   console.log(accountantData);
// };


// PUT IN RETURN:

// <div>
// {/* Button to open the AddAccountant modal */}
// <button onClick={handleOpenModal}>Add Accountant</button>

// {/* The AddAccountant modal */}
// <AddAccountant
//   isOpen={showModal}
//   onRequestClose={handleCloseModal}
//   onAdd={handleAddAccountant}
// />
// </div>