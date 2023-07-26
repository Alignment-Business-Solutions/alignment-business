import React, { useEffect, useReact, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import ClientListItem from "../ClientListItem/ClientListItem";
import AddAccountant from "../AddAccountant/AddAccountant";
import axios from "axios";

function ClientList() {
  const dispatch = useDispatch();
  const allClients = useSelector((store) => store.allClients);
  const user = useSelector((store) => store.user);
  const history = useHistory();

  useEffect(() => {
    dispatch({
      type: "FETCH_ALL_CLIENTS",
    });
  }, []);

  const assignClient = (client_id) => {
    dispatch({
      type: "ADD_CLIENT",
      payload: { client_id },
    });
    console.log("Assigned to Accountant");
  };

  const goToMyClients = () => {
    history.push("/myClients");
  };

  const [showModal, setShowModal] = useState(false);

  const handleOpenModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleAddAccountant = (accountantData) => {
    // Send a POST request to your server with the accountantData
    axios
      .post('/api/client/createaccountant', {
        first_name: accountantData.firstName,
        last_name: accountantData.lastName,
      })
      .then((response) => {
        console.log('Accountant added successfully:', response.data);
        // You can perform any additional actions here if needed
      })
      .catch((error) => {
        console.error('Error adding accountant:', error);
        // Handle errors if necessary
      });

    // Close the modal after sending the request
    handleCloseModal();
  };

  return (
    <>
      <div>
        <h1>Clients</h1>
        {allClients && allClients.length > 0 ? (
          <ul>
            {allClients.map((client, i) => (
              <li key={i}>
                {client.accountant_id == null ? (
                  <ClientListItem client={client} assignClient={assignClient} />
                ) : (
                  <p>Assigned!</p>
                )}
              </li>
            ))}
          </ul>
        ) : (
          <p>There are no clients available at this time.</p>
        )}
        <button onClick={goToMyClients}>My Clients</button>
      </div>
      <div>
        {/* Conditionally render the button if access_level is 2 */}
        {user.access_level === 2 && (
          <button onClick={handleOpenModal}>New Accountant</button>
        )}

        {/* The AddAccountant modal */}
        <AddAccountant
          isOpen={showModal}
          onRequestClose={handleCloseModal}
          onAdd={handleAddAccountant}
        />
      </div>
    </>
  );
}

export default ClientList;
