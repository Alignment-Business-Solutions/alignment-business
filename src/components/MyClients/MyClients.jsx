import React, { useEffect, useReact } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, Link } from "react-router-dom";
import MyClientsItem from "./MyClientsItem/MyClientsItem";
import { Typography, Button } from "@mui/material";

function MyClients() {
  const dispatch = useDispatch();
  const myClients = useSelector((store) => store.myClients);
  const history = useHistory();

  useEffect(() => {
    dispatch({
      type: "FETCH_MY_CLIENTS",
    });
    dispatch({ type: "UNSET_SELECTED_CLIENT" });
  }, []);

  const goClients = () => {
    history.push("/clients");
  };

  // console.log('my clients list is:', myClients);

  return (
    <div>
      <Typography variant="h2">Accountants's Clients</Typography>
      {myClients && myClients.length > 0 ? (
        <ul>
          {myClients.map((client, i) => (
            <MyClientsItem key={i} client={client} />
          ))}
        </ul>
      ) : (
        <Typography variant="body1">No clients found.</Typography>
      )}
      <Button variant="contained" onClick={goClients}>
        Clients
      </Button>
    </div>
  );
}

export default MyClients;
