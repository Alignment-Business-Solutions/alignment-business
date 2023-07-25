import React, { useEffect, useReact } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import ClientListItem from "../ClientListItem/ClientListItem";

function ClientList() {
  const dispatch = useDispatch();
  const allClients = useSelector((store) => store.allClients);
  const history = useHistory();

  useEffect(() => {
    dispatch({
      type: "FETCH_ALL_CLIENTS",
    });
  }, []);

  const assignClient = (client_id) => {
    dispatch({
        type: 'ADD_CLIENT',
        payload: {client_id}
    })
    console.log("Assigned to Accountant");
  };

  const goToMyClients = () => {
    history.push("/myClients");
  };

  return (
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
  );
}

export default ClientList;
