import React, { useEffect, useReact, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import ClientListItem from "../ClientListItem/ClientListItem";
import AddAccountant from "../AddAccountant/AddAccountant";

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
    // Handle the data sent from the AddAccountant modal
    console.log(accountantData);
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
        <button onClick={goToMyClients}>Accountant's Clients</button>
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
