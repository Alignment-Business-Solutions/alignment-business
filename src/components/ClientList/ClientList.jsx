import React, { useEffect, useReact, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import ClientListItem from "../ClientListItem/ClientListItem";
import AddAccountant from "../AddAccountant/AddAccountant";
import axios from "axios";
import AddClient from "../AddClient/AddClient";
import { Button, Typography } from "@mui/material";

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

  const [showClientModal, setShowClientModal] = useState(false);

  const handleOpenClientModal = () => {
    setShowClientModal(true);
  };

  const handleCloseClientModal = () => {
    setShowClientModal(false);
  };

  const handleAddAccountant = (accountantData) => {
    // Send a POST request to your server with the accountantData
    axios
      .post("/api/client/createaccountant", {
        first_name: accountantData.firstName,
        last_name: accountantData.lastName,
      })
      .then((response) => {
        console.log("Accountant created successfully:", response.data);
      })
      .catch((error) => {
        console.error("Error creating accountant:", error);
        // Handle errors if necessary
      });

    // Close the modal after sending the request
    handleCloseModal();
  };

  const handleAddClient = (clientData) => {
    // Send a POST request to your server with the clientData
    axios
      .post("/api/client/createclient", {
        company_name: clientData.companyName,
      })
      .then((response) => {
        console.log("Client created successfully:", response.data);
        dispatch({
          type: "FETCH_ALL_CLIENTS",
        });
      })
      .catch((error) => {
        console.error("Error creating client:", error);
        // Handle errors if necessary
      });

    // Close the modal after sending the request
    handleCloseClientModal();
  };

  return (
    <>
      <div>
        <Typography variant="h3">Clients</Typography>
        {allClients && allClients.length > 0 ? (
          <ul>
            {allClients.map((client, i) => (
              <li key={i}>
                {client.accountant_id == null ? (
                  <ClientListItem client={client} assignClient={assignClient} />
                ) : (
                  <p>{client.company_name} (Assigned)</p>
                )}
              </li>
            ))}
          </ul>
        ) : (
          <p>There are no clients available at this time.</p>
        )}
        <Button variant="contained" onClick={goToMyClients}>
          My Clients
        </Button>
      </div>
      <div>
        {user.access_level === 2 && (
          <Button variant="contained" onClick={handleOpenModal}>
            New Accountant
          </Button>
        )}
        <AddAccountant
          isOpen={showModal}
          onRequestClose={handleCloseModal}
          onAdd={handleAddAccountant}
        />
      </div>
      <div>
        {user.access_level >= 1 && (
          <Button variant="contained" onClick={handleOpenClientModal}>
            New Client
          </Button>
        )}
        <AddClient
          isOpen={showClientModal}
          onRequestClose={handleCloseClientModal}
          onAdd={handleAddClient}
        />
      </div>
    </>
  );
}

export default ClientList;
