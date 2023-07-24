import React, { useEffect, useReact } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";


function MyClients() {

    const dispatch = useDispatch();
    const myClients = useSelector((store) => store.myClients);

  useEffect(() => {
    dispatch({
      type: "FETCH_MY_CLIENTS",
    });
  }, []);

        return (
            <ul>
                {myClients && myClients.map((oneClient, i) => (
                    <li key={i}> {oneClient.company_name}</li>
                ))}
            </ul>
        )
}

export default MyClients